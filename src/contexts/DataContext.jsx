import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const DataContext = createContext();

export const useData = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRides = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('rides')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching rides:', error);
        toast({
          variant: "destructive",
          title: "❌ Database Error",
          description: "Could not fetch ride data. Please try again later.",
        });
      } else {
        setRides(data);
      }
      setLoading(false);
    };

    fetchRides();
  }, [toast]);

  const addRide = async (rideData) => {
    const newRideData = {
      from: rideData.from,
      to: rideData.to,
      date: rideData.date,
      time: rideData.time,
      vehicle: rideData.vehicleType,
      seats: parseInt(rideData.seats, 10),
      price: parseFloat(rideData.price),
      driver: 'You',
      rating: 5,
      image: 'User profile picture placeholder',
      status: 'confirmed',
      passengers: 0,
    };
    
    const { data, error } = await supabase
      .from('rides')
      .insert([newRideData])
      .select();

    if (error) {
      console.error('Error adding ride:', error);
      toast({
        variant: "destructive",
        title: "❌ Could not offer ride",
        description: "There was an error listing your ride. Please try again.",
      });
    } else {
      setRides(prevRides => [data[0], ...prevRides]);
      toast({
        title: "✅ Ride Offered!",
        description: "Your ride has been successfully listed.",
      });
    }
  };

  const bookRide = (rideId) => {
    toast({
      title: "🚗 Booking ride...",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const value = {
    rides,
    addRide,
    bookRide,
    loading,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
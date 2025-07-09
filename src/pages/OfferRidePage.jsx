import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, MapPin, Calendar, Clock, Users, Car, Bike, DollarSign, Crosshair, Zap, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useData } from '@/contexts/DataContext';
import Navigation from '@/components/Navigation';

const OfferRidePage = () => {
  const { toast } = useToast();
  const { addRide } = useData();
  const [isLocating, setIsLocating] = useState(false);
  const [rideForm, setRideForm] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    seats: '1',
    vehicleType: 'car',
    price: '',
    description: '',
    recurring: 'no'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addRide(rideForm);
    setRideForm({
      from: '',
      to: '',
      date: '',
      time: '',
      seats: '1',
      vehicleType: 'car',
      price: '',
      description: '',
      recurring: 'no'
    });
  };

  const handleInputChange = (field, value) => {
    setRideForm(prev => ({ ...prev, [field]: value }));
  };

  const handleFetchLocation = async (field) => {
    if (!navigator.geolocation) {
      toast({
        variant: "destructive",
        title: "❌ Location Not Available",
        description: "Your device doesn't support location services.",
      });
      return;
    }

    setIsLocating(true);
    toast({
      title: "🛰️ Getting your location...",
      description: "Please allow location access when prompted.",
    });

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
            {
              headers: {
                'User-Agent': 'RuralConnect/1.0'
              }
            }
          );
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          
          if (data && data.display_name) {
            const address = data.display_name;
            handleInputChange(field, address);
            toast({
              title: "📍 Location Found!",
              description: "Your current address has been automatically filled in.",
            });
          } else {
            // Fallback to coordinates if no address found
            const coordsString = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
            handleInputChange(field, coordsString);
            toast({
              title: "📍 Coordinates Set",
              description: "Using your GPS coordinates as location.",
            });
          }
        } catch (error) {
          console.error("Geocoding error:", error);
          // Fallback to coordinates
          const coordsString = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
          handleInputChange(field, coordsString);
          toast({
            variant: "destructive",
            title: "⚠️ Address lookup failed",
            description: "Using GPS coordinates instead. You can edit this manually.",
          });
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        let errorMessage = "Could not get your location. ";
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += "Please allow location access in your browser settings.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage += "Location request timed out.";
            break;
          default:
            errorMessage += "An unknown error occurred.";
            break;
        }
        
        toast({
          variant: "destructive",
          title: "❌ Location Error",
          description: errorMessage,
        });
      },
      options
    );
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-6 py-3 rounded-full glass-effect mb-8">
              <Sparkles className="h-5 w-5 text-purple-400 mr-2" />
              <span className="text-white font-medium">Share Your Journey</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              <span className="gradient-text">Offer a Ride</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Connect with your community and make transportation accessible for everyone while earning extra income
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="glass-effect border-white/10 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-600/20 to-pink-600/20">
                <CardTitle className="text-white flex items-center text-2xl font-bold">
                  <Zap className="h-6 w-6 mr-3" />
                  Create Your Ride Offer
                </CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  Fill in your journey details to help community members find and book with you
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white flex items-center">
                      <MapPin className="h-6 w-6 mr-3 text-blue-400" />
                      Route Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="from" className="text-white text-lg font-semibold">Starting Point</Label>
                        <div className="flex items-center gap-3">
                          <div className="relative flex-grow">
                            <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                            <Input
                              id="from"
                              placeholder="Enter starting location"
                              value={rideForm.from}
                              onChange={(e) => handleInputChange('from', e.target.value)}
                              className="pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-2xl input-glow text-lg"
                              required
                            />
                          </div>
                          <Button 
                            type="button" 
                            size="lg"
                            className={`location-btn rounded-2xl h-14 px-6 ${isLocating ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => handleFetchLocation('from')}
                            disabled={isLocating}
                          >
                            <Crosshair className={`h-5 w-5 ${isLocating ? 'animate-spin' : ''}`} />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="to" className="text-white text-lg font-semibold">Destination</Label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                          <Input
                            id="to"
                            placeholder="Enter destination"
                            value={rideForm.to}
                            onChange={(e) => handleInputChange('to', e.target.value)}
                            className="pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-2xl input-glow text-lg"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white flex items-center">
                      <Clock className="h-6 w-6 mr-3 text-green-400" />
                      Schedule Details
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="date" className="text-white text-lg font-semibold">Date</Label>
                        <div className="relative">
                          <Calendar className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                          <Input
                            id="date"
                            type="date"
                            value={rideForm.date}
                            onChange={(e) => handleInputChange('date', e.target.value)}
                            className="pl-12 h-14 bg-white/10 border-white/20 text-white rounded-2xl input-glow"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="time" className="text-white text-lg font-semibold">Departure Time</Label>
                        <div className="relative">
                          <Clock className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                          <Input
                            id="time"
                            type="time"
                            value={rideForm.time}
                            onChange={(e) => handleInputChange('time', e.target.value)}
                            className="pl-12 h-14 bg-white/10 border-white/20 text-white rounded-2xl input-glow"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="recurring" className="text-white text-lg font-semibold">Frequency</Label>
                        <Select
                          value={rideForm.recurring}
                          onChange={(e) => handleInputChange('recurring', e.target.value)}
                          className="h-14 bg-white/10 border-white/20 text-white rounded-2xl input-glow"
                        >
                          <option value="no">One-time ride</option>
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white flex items-center">
                      <Car className="h-6 w-6 mr-3 text-purple-400" />
                      Vehicle & Pricing
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="vehicleType" className="text-white text-lg font-semibold">Vehicle Type</Label>
                        <Select
                          value={rideForm.vehicleType}
                          onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                          className="h-14 bg-white/10 border-white/20 text-white rounded-2xl input-glow"
                        >
                          <option value="car">Car</option>
                          <option value="bike">Motorcycle/Bike</option>
                        </Select>
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="seats" className="text-white text-lg font-semibold">Available Seats</Label>
                        <div className="relative">
                          <Users className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                          <Select
                            value={rideForm.seats}
                            onChange={(e) => handleInputChange('seats', e.target.value)}
                            className="pl-12 h-14 bg-white/10 border-white/20 text-white rounded-2xl input-glow"
                          >
                            <option value="1">1 Seat</option>
                            <option value="2">2 Seats</option>
                            <option value="3">3 Seats</option>
                            <option value="4">4 Seats</option>
                            <option value="5">5+ Seats</option>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="price" className="text-white text-lg font-semibold">Price per Person</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                          <Input
                            id="price"
                            type="number"
                            placeholder="0.00"
                            value={rideForm.price}
                            onChange={(e) => handleInputChange('price', e.target.value)}
                            className="pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-2xl input-glow text-lg"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white flex items-center">
                      <Sparkles className="h-6 w-6 mr-3 text-yellow-400" />
                      Additional Details
                    </h3>
                    <div className="space-y-3">
                      <Label htmlFor="description" className="text-white text-lg font-semibold">Description (Optional)</Label>
                      <Textarea
                        id="description"
                        placeholder="Share any additional details about your ride, pickup points, or special requirements..."
                        value={rideForm.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[120px] rounded-2xl input-glow text-lg"
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full btn-primary text-white h-16 text-xl font-bold rounded-2xl pulse-glow">
                    <Plus className="h-6 w-6 mr-3" />
                    Create Amazing Ride Offer
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OfferRidePage;
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Clock, Users, Car, Bike, Filter, Crosshair, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useData } from '@/contexts/DataContext';
import Navigation from '@/components/Navigation';
const BookRidePage = () => {
  const {
    toast
  } = useToast();
  const {
    rides,
    bookRide
  } = useData();
  const [searchForm, setSearchForm] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    passengers: '1',
    vehicleType: 'any'
  });
  const [isLocating, setIsLocating] = useState(false);
  const handleInputChange = (field, value) => {
    setSearchForm(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleFetchLocation = async field => {
    if (!navigator.geolocation) {
      toast({
        variant: "destructive",
        title: "❌ Location Not Available",
        description: "Your device doesn't support location services."
      });
      return;
    }
    setIsLocating(true);
    toast({
      title: "🛰️ Getting your location...",
      description: "Please allow location access when prompted."
    });
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000
    };
    navigator.geolocation.getCurrentPosition(async position => {
      const {
        latitude,
        longitude
      } = position.coords;
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`, {
          headers: {
            'User-Agent': 'RuralConnect/1.0'
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data && data.display_name) {
          const address = data.display_name;
          handleInputChange(field, address);
          toast({
            title: "📍 Location Found!",
            description: "Your current address has been automatically filled in."
          });
        } else {
          // Fallback to coordinates if no address found
          const coordsString = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
          handleInputChange(field, coordsString);
          toast({
            title: "📍 Coordinates Set",
            description: "Using your GPS coordinates as location."
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
          description: "Using GPS coordinates instead. You can edit this manually."
        });
      } finally {
        setIsLocating(false);
      }
    }, error => {
      setIsLocating(false);
      let errorMessage = "Could not get your location. ";
      switch (error.code) {
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
        description: errorMessage
      });
    }, options);
  };
  const filteredRides = useMemo(() => {
    return rides.filter(ride => {
      const fromMatch = searchForm.from ? ride.from.toLowerCase().includes(searchForm.from.toLowerCase()) : true;
      const toMatch = searchForm.to ? ride.to.toLowerCase().includes(searchForm.to.toLowerCase()) : true;
      const dateMatch = searchForm.date ? ride.date === searchForm.date : true;
      const vehicleMatch = searchForm.vehicleType !== 'any' ? ride.vehicle === searchForm.vehicleType : true;
      const passengerMatch = ride.seats >= parseInt(searchForm.passengers);
      return fromMatch && toMatch && dateMatch && vehicleMatch && passengerMatch;
    });
  }, [rides, searchForm]);
  const handleSearch = e => {
    e.preventDefault();
    toast({
      title: "🔍 Search Complete!",
      description: `Found ${filteredRides.length} perfect matches for your journey.`
    });
  };
  return <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full glass-effect mb-8">
              <Search className="h-5 w-5 text-blue-400 mr-2" />
              <span className="text-white font-medium">Smart Ride Discovery</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              <span className="gradient-text">Find Your Perfect Ride</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">Discover amazing journeys with trusted community members using our intelligent matching system ok</p>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="mb-16">
            <Card className="glass-effect border-white/10 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600/20 to-purple-600/20">
                <CardTitle className="text-white flex items-center text-2xl font-bold">
                  <Zap className="h-6 w-6 mr-3" />
                  Smart Search
                </CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  Use our advanced filters to find the perfect ride for your needs
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSearch} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="from" className="text-white text-lg font-semibold">From</Label>
                      <div className="flex items-center gap-3">
                        <div className="relative flex-grow">
                          <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                          <Input id="from" placeholder="Enter pickup location" value={searchForm.from} onChange={e => handleInputChange('from', e.target.value)} className="pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-2xl input-glow text-lg" />
                        </div>
                        <Button type="button" size="lg" className={`location-btn rounded-2xl h-14 px-6 ${isLocating ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => handleFetchLocation('from')} disabled={isLocating}>
                          <Crosshair className={`h-5 w-5 ${isLocating ? 'animate-spin' : ''}`} />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="to" className="text-white text-lg font-semibold">To</Label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                        <Input id="to" placeholder="Enter destination" value={searchForm.to} onChange={e => handleInputChange('to', e.target.value)} className="pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-2xl input-glow text-lg" />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="date" className="text-white text-lg font-semibold">Date</Label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                        <Input id="date" type="date" value={searchForm.date} onChange={e => handleInputChange('date', e.target.value)} className="pl-12 h-14 bg-white/10 border-white/20 text-white rounded-2xl input-glow" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="time" className="text-white text-lg font-semibold">Time</Label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                        <Input id="time" type="time" value={searchForm.time} onChange={e => handleInputChange('time', e.target.value)} className="pl-12 h-14 bg-white/10 border-white/20 text-white rounded-2xl input-glow" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="passengers" className="text-white text-lg font-semibold">Passengers</Label>
                      <Select value={searchForm.passengers} onChange={e => handleInputChange('passengers', e.target.value)} className="h-14 bg-white/10 border-white/20 text-white rounded-2xl input-glow">
                        <option value="1">1 Passenger</option>
                        <option value="2">2 Passengers</option>
                        <option value="3">3 Passengers</option>
                        <option value="4">4+ Passengers</option>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="vehicle" className="text-white text-lg font-semibold">Vehicle</Label>
                      <Select value={searchForm.vehicleType} onChange={e => handleInputChange('vehicleType', e.target.value)} className="h-14 bg-white/10 border-white/20 text-white rounded-2xl input-glow">
                        <option value="any">Any Vehicle</option>
                        <option value="car">Car Only</option>
                        <option value="bike">Bike Only</option>
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" className="w-full btn-primary text-white h-16 text-xl font-bold rounded-2xl pulse-glow">
                    <Search className="h-6 w-6 mr-3" />
                    Find Amazing Rides
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.4
        }}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-black text-white">
                Available Rides 
                <span className="gradient-text ml-2">({filteredRides.length})</span>
              </h2>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-2xl px-6 py-3" onClick={() => toast({
              title: "🚧 Advanced filters coming soon!",
              description: "More filtering options will be available in the next update! 🚀"
            })}>
                <Filter className="h-5 w-5 mr-2" />
                Advanced Filters
              </Button>
            </div>

            <div className="grid gap-8">
              {filteredRides.length > 0 ? filteredRides.map((ride, index) => <motion.div key={ride.id} initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.6,
              delay: index * 0.1
            }} whileHover={{
              scale: 1.02
            }}>
                    <Card className="ride-card rounded-3xl overflow-hidden">
                      <CardContent className="p-8">
                        <div className="flex flex-col lg:flex-row gap-8">
                          <div className="flex-shrink-0">
                            <img className="w-24 h-24 rounded-2xl object-cover shadow-lg" alt={`${ride.driver} profile picture`} src="https://images.unsplash.com/photo-1652594323625-01ab4e191f73" />
                          </div>
                          
                          <div className="flex-grow">
                            <div className="flex items-start justify-between mb-6">
                              <div>
                                <h3 className="text-2xl font-bold text-white mb-2">{ride.driver}</h3>
                                <div className="flex items-center mb-3">
                                  {[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < Math.floor(ride.rating || 4.8) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />)}
                                  <span className="text-gray-300 ml-2">({ride.rating || '4.8'})</span>
                                </div>
                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-300">
                                  <span className="flex items-center text-lg">
                                    <MapPin className="h-5 w-5 mr-2" />
                                    {ride.from} → {ride.to}
                                  </span>
                                  <span className="flex items-center">
                                    <Calendar className="h-5 w-5 mr-2" />
                                    {ride.date}
                                  </span>
                                  <span className="flex items-center">
                                    <Clock className="h-5 w-5 mr-2" />
                                    {ride.time}
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-3xl font-black gradient-text mb-1">${ride.price}</div>
                                <div className="text-sm text-gray-400">per person</div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <Badge variant="secondary" className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border-white/20 px-4 py-2 rounded-full">
                                  {ride.vehicle === 'car' ? <Car className="h-4 w-4 mr-2" /> : <Bike className="h-4 w-4 mr-2" />}
                                  {ride.vehicle === 'car' ? 'Car' : 'Bike'}
                                </Badge>
                                <Badge variant="outline" className="border-white/20 text-white px-4 py-2 rounded-full">
                                  <Users className="h-4 w-4 mr-2" />
                                  {ride.seats} seats available
                                </Badge>
                              </div>
                              
                              <Button onClick={() => bookRide(ride.id)} className="btn-primary text-white px-8 py-3 text-lg font-semibold rounded-2xl">
                                Book This Ride
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>) : <Card className="glass-effect border-white/10 rounded-3xl">
                  <CardContent className="p-16 text-center">
                    <Search className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-4">No Rides Found</h3>
                    <p className="text-gray-300 text-lg">Try adjusting your search criteria or check back later for new rides.</p>
                  </CardContent>
                </Card>}
            </div>
          </motion.div>
        </div>
      </div>
    </div>;
};
export default BookRidePage;
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Calendar, Clock, MapPin, Users, Car, Bike, Star, TrendingUp, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useData } from '@/contexts/DataContext';
import Navigation from '@/components/Navigation';

const DashboardPage = () => {
  const { toast } = useToast();
  const { rides } = useData();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = useMemo(() => {
    const myRides = rides.filter(r => r.driver === 'You');
    const totalRides = myRides.length;
    const totalEarnings = myRides.reduce((acc, ride) => acc + (parseFloat(ride.price) * ride.passengers), 0);
    const averageRating = myRides.length > 0 ? (myRides.reduce((acc, ride) => acc + ride.rating, 0) / myRides.length).toFixed(1) : 'N/A';
    
    return [
      { title: 'Total Rides Offered', value: totalRides, icon: Car, change: '+12%', color: 'text-green-500' },
      { title: 'Total Earnings', value: `$${totalEarnings.toFixed(2)}`, icon: DollarSign, change: '+8%', color: 'text-blue-500' },
      { title: 'Your Rating', value: averageRating, icon: Star, change: '', color: 'text-yellow-500' },
      { title: 'Saved CO2 (Est.)', value: `${(totalRides * 5).toFixed(1)}kg`, icon: TrendingUp, change: '+15%', color: 'text-emerald-500' }
    ];
  }, [rides]);

  const upcomingRides = useMemo(() => {
    const now = new Date();
    return rides
      .filter(ride => new Date(`${ride.date}T${ride.time}`) > now)
      .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`))
      .slice(0, 3);
  }, [rides]);

  const recentActivity = [
    { id: 1, action: 'Completed ride to County Hospital', time: '2 hours ago', type: 'completed' },
    { id: 2, action: 'New booking request from Mike T.', time: '5 hours ago', type: 'booking' },
    { id: 3, action: 'Ride offer created for Market Square', time: '1 day ago', type: 'offer' },
    { id: 4, action: 'Received 5-star rating from Emma D.', time: '2 days ago', type: 'rating' }
  ];

  const handleQuickAction = (action) => {
    toast({
      title: `🚀 ${action}...`,
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-xl text-gray-300">
              Welcome back! Here's your ride sharing activity overview
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="glass-effect border-white/10">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                          <p className="text-2xl font-bold text-white">{stat.value}</p>
                          {stat.change && <p className={`text-sm ${stat.color}`}>{stat.change}</p>}
                        </div>
                        <div className={`p-3 rounded-lg bg-white/10`}>
                          <Icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-white/10 border border-white/20">
                <TabsTrigger value="overview" className="data-[state=active]:bg-green-600">Overview</TabsTrigger>
                <TabsTrigger value="rides" className="data-[state=active]:bg-green-600">My Rides</TabsTrigger>
                <TabsTrigger value="activity" className="data-[state=active]:bg-green-600">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <Card className="glass-effect border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Calendar className="h-5 w-5 mr-2" />
                        Upcoming Rides
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {upcomingRides.length > 0 ? upcomingRides.map((ride) => (
                        <div key={ride.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${ride.vehicle === 'car' ? 'bg-blue-600/20' : 'bg-green-600/20'}`}>
                              {ride.vehicle === 'car' ? 
                                <Car className="h-4 w-4 text-blue-400" /> : 
                                <Bike className="h-4 w-4 text-green-400" />
                              }
                            </div>
                            <div>
                              <p className="text-white font-medium">{ride.from} → {ride.to}</p>
                              <p className="text-sm text-gray-400">{ride.date} at {ride.time}</p>
                            </div>
                          </div>
                          <Badge variant={ride.status === 'confirmed' ? 'default' : 'secondary'}>
                            {ride.status}
                          </Badge>
                        </div>
                      )) : (
                        <div className="text-center py-8">
                          <p className="text-gray-400">No upcoming rides scheduled.</p>
                        </div>
                      )}
                      <Button 
                        onClick={() => setActiveTab('rides')}
                        variant="outline" 
                        className="w-full border-white/20 text-white hover:bg-white/10"
                      >
                        View All Rides
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="glass-effect border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">Quick Actions</CardTitle>
                      <CardDescription className="text-gray-300">
                        Common tasks to get you started
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button onClick={() => handleQuickAction('Offer new ride')} className="w-full bg-green-600 hover:bg-green-700 text-white justify-start">
                        <Car className="h-4 w-4 mr-2" /> Offer a New Ride
                      </Button>
                      <Button onClick={() => handleQuickAction('Find ride')} variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 justify-start">
                        <MapPin className="h-4 w-4 mr-2" /> Find a Ride
                      </Button>
                      <Button onClick={() => handleQuickAction('View messages')} variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 justify-start">
                        <Users className="h-4 w-4 mr-2" /> View Messages
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="rides" className="space-y-6">
                <Card className="glass-effect border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">All My Rides</CardTitle>
                    <CardDescription className="text-gray-300">
                      View and manage your ride history and upcoming bookings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {rides.length > 0 ? (
                      rides.map(ride => (
                         <div key={ride.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${ride.vehicle === 'car' ? 'bg-blue-600/20' : 'bg-green-600/20'}`}>
                              {ride.vehicle === 'car' ? 
                                <Car className="h-4 w-4 text-blue-400" /> : 
                                <Bike className="h-4 w-4 text-green-400" />
                              }
                            </div>
                            <div>
                              <p className="text-white font-medium">{ride.from} → {ride.to}</p>
                              <p className="text-sm text-gray-400">{ride.date} at {ride.time} - {ride.driver === 'You' ? 'You are driving' : `Driver: ${ride.driver}`}</p>
                            </div>
                          </div>
                          <Badge variant={ride.status === 'confirmed' ? 'default' : 'secondary'}>
                            {ride.status}
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400 mb-4">You haven't offered or booked any rides yet.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <Card className="glass-effect border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'completed' ? 'bg-green-500' :
                          activity.type === 'booking' ? 'bg-blue-500' :
                          activity.type === 'offer' ? 'bg-purple-500' :
                          'bg-yellow-500'
                        }`} />
                        <div className="flex-grow">
                          <p className="text-white">{activity.action}</p>
                          <p className="text-sm text-gray-400">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
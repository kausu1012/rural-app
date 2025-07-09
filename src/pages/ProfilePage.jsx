import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Star, Car, Bike, MapPin, Phone, Mail, Edit, Camera, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import Navigation from '@/components/Navigation';

const ProfilePage = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    location: 'Millbrook Village',
    bio: 'Friendly local farmer who loves helping neighbors get around. Been driving these rural roads for over 20 years!',
    rating: 4.8,
    totalRides: 156,
    joinDate: 'March 2023',
    vehicles: [
      { type: 'car', model: '2018 Toyota Camry', seats: 4, verified: true },
      { type: 'bike', model: 'Honda CB500F', seats: 1, verified: true }
    ]
  });

  const reviews = [
    {
      id: 1,
      reviewer: 'Sarah Johnson',
      rating: 5,
      comment: 'John is an excellent driver! Very punctual and friendly. Made the long trip to the city very comfortable.',
      date: '2 weeks ago'
    },
    {
      id: 2,
      reviewer: 'Mike Thompson',
      rating: 5,
      comment: 'Great conversation and safe driving. John knows all the best routes through the countryside.',
      date: '1 month ago'
    },
    {
      id: 3,
      reviewer: 'Emma Davis',
      rating: 4,
      comment: 'Reliable and helpful. John even helped me carry my groceries to the door!',
      date: '2 months ago'
    }
  ];

  const handleSave = () => {
    toast({
      title: "💾 Saving profile...",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleVerifyVehicle = (vehicleIndex) => {
    toast({
      title: "🔍 Verifying vehicle...",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">My Profile</span>
            </h1>
            <p className="text-xl text-gray-300">
              Manage your profile and build trust within the community
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <Card className="glass-effect border-white/10">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6">
                    <img  
                      className="w-24 h-24 rounded-full mx-auto object-cover"
                      alt="John Smith profile picture"
                     src="https://images.unsplash.com/flagged/photo-1568811034478-0ca324d5f8f0" />
                    <Button
                      size="sm"
                      className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/2 bg-green-600 hover:bg-green-700 rounded-full p-2"
                      onClick={() => toast({
                        title: "📸 Updating photo...",
                        description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                      })}
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white mb-2">{profile.name}</h2>
                  <p className="text-gray-300 mb-4 flex items-center justify-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {profile.location}
                  </p>
                  
                  <div className="flex items-center justify-center space-x-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-500 flex items-center justify-center">
                        <Star className="h-5 w-5 mr-1" />
                        {profile.rating}
                      </div>
                      <div className="text-sm text-gray-400">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-500">{profile.totalRides}</div>
                      <div className="text-sm text-gray-400">Rides</div>
                    </div>
                  </div>
                  
                  <Badge variant="secondary" className="bg-green-600/20 text-green-400 mb-4">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified Member
                  </Badge>
                  
                  <p className="text-sm text-gray-400">Member since {profile.joinDate}</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Profile Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Personal Information */}
              <Card className="glass-effect border-white/10">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Personal Information</CardTitle>
                    <CardDescription className="text-gray-300">
                      Your basic profile details
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing ? 'Cancel' : 'Edit'}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-white">Full Name</Label>
                          <Input
                            id="name"
                            value={profile.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location" className="text-white">Location</Label>
                          <Input
                            id="location"
                            value={profile.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-white">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-white">Phone</Label>
                          <Input
                            id="phone"
                            value={profile.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio" className="text-white">Bio</Label>
                        <Textarea
                          id="bio"
                          value={profile.bio}
                          onChange={(e) => handleInputChange('bio', e.target.value)}
                          className="bg-white/10 border-white/20 text-white min-h-[100px]"
                        />
                      </div>
                      <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-400">Email</p>
                          <p className="text-white flex items-center">
                            <Mail className="h-4 w-4 mr-2" />
                            {profile.email}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Phone</p>
                          <p className="text-white flex items-center">
                            <Phone className="h-4 w-4 mr-2" />
                            {profile.phone}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-2">About Me</p>
                        <p className="text-white">{profile.bio}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Vehicles */}
              <Card className="glass-effect border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">My Vehicles</CardTitle>
                  <CardDescription className="text-gray-300">
                    Verified vehicles available for ride sharing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile.vehicles.map((vehicle, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${vehicle.type === 'car' ? 'bg-blue-600/20' : 'bg-green-600/20'}`}>
                          {vehicle.type === 'car' ? 
                            <Car className="h-5 w-5 text-blue-400" /> : 
                            <Bike className="h-5 w-5 text-green-400" />
                          }
                        </div>
                        <div>
                          <p className="text-white font-medium">{vehicle.model}</p>
                          <p className="text-sm text-gray-400">{vehicle.seats} seats available</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {vehicle.verified ? (
                          <Badge variant="default" className="bg-green-600">
                            <Shield className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleVerifyVehicle(index)}
                            className="border-white/20 text-white hover:bg-white/10"
                          >
                            Verify
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Reviews */}
              <Card className="glass-effect border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Recent Reviews</CardTitle>
                  <CardDescription className="text-gray-300">
                    What other community members say about you
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-white font-medium">{review.reviewer}</p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-400'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-300 mb-2">{review.comment}</p>
                      <p className="text-sm text-gray-400">{review.date}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
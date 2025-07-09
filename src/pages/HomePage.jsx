import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Users, MapPin, Shield, Clock, Star, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
const HomePage = () => {
  const features = [{
    icon: Zap,
    title: 'Smart Connections',
    description: 'AI-powered matching connects you with the perfect ride partners in your community',
    color: 'from-yellow-400 to-orange-500'
  }, {
    icon: Users,
    title: 'Community First',
    description: 'Build lasting relationships with verified neighbors while sharing sustainable journeys',
    color: 'from-green-400 to-blue-500'
  }, {
    icon: MapPin,
    title: 'Local Expertise',
    description: 'Navigate rural roads with confidence using our specialized local route intelligence',
    color: 'from-purple-400 to-pink-500'
  }, {
    icon: Shield,
    title: 'Trust & Safety',
    description: 'Advanced verification system ensures every ride is safe, secure, and reliable',
    color: 'from-blue-400 to-indigo-500'
  }, {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Adapt to rural life rhythms with smart scheduling that works around farming seasons',
    color: 'from-teal-400 to-cyan-500'
  }, {
    icon: Star,
    title: 'Premium Experience',
    description: 'Enjoy premium comfort and service at community-friendly prices',
    color: 'from-rose-400 to-red-500'
  }];
  const stats = [{
    number: '5,200+',
    label: 'Active Members',
    icon: Users
  }, {
    number: '28,500+',
    label: 'Successful Rides',
    icon: Zap
  }, {
    number: '120+',
    label: 'Rural Communities',
    icon: MapPin
  }, {
    number: '4.9★',
    label: 'Average Rating',
    icon: Star
  }];
  return <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 hero-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }} className="mb-12">
              <motion.div initial={{
              scale: 0.8
            }} animate={{
              scale: 1
            }} transition={{
              duration: 1,
              delay: 0.2
            }} className="inline-flex items-center px-6 py-3 rounded-full glass-effect mb-8">
                <Sparkles className="h-5 w-5 text-yellow-400 mr-2" />
                <span className="text-white font-medium">Revolutionizing Rural Transportation & Development</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                <span className="gradient-text">The Challenge:</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">“Connecting Farmers, Villagers, and Cities – Together We Grow” •	                                                         


Access rides, services, markets, and support – all in one place.                                                                        

🚜 I'm a Farmer •
🏙 I'm a City Service Provider</p>
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
          }} className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link to="/book-ride">
                <Button size="lg" className="btn-primary text-white px-10 py-4 text-lg font-semibold rounded-full pulse-glow group">
                  Find Your Ride
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/offer-ride">
                <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-4 text-lg font-semibold rounded-full neon-border">
                  Share Your Journey
                </Button>
              </Link>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            scale: 0.8
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            duration: 1,
            delay: 0.6
          }} className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl floating-animation">
                <img className="w-full max-w-5xl mx-auto" alt="Farmers with their ox working on village land in a rural setting" src="https://images.unsplash.com/photo-1699680946854-0c1490484c56" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
            const Icon = stat.icon;
            return <motion.div key={index} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6,
              delay: index * 0.1
            }} className="text-center stats-counter rounded-2xl p-6 card-hover">
                  <div className="feature-icon w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-black gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 font-medium">{stat.label}</div>
                </motion.div>;
          })}
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              Why Choose <span className="gradient-text">Rural Connect</span>?
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Experience the future of rural transportation with cutting-edge features designed for your community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
            const Icon = feature.icon;
            return <motion.div key={index} initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6,
              delay: index * 0.1
            }} whileHover={{
              scale: 1.05
            }} className="card-hover">
                  <Card className="glass-effect border-white/10 h-full rounded-2xl overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-white text-xl font-bold">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-300 text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>;
          })}
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }}>
            <h2 className="text-4xl md:text-6xl font-black mb-8 text-white">
              Ready to Transform Your <span className="gradient-text">Journey</span>?
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              Join thousands of rural travelers who've discovered a better way to connect, share, and thrive together
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/book-ride">
                <Button size="lg" className="btn-primary text-white px-12 py-4 text-xl font-bold rounded-full pulse-glow">
                  Start Your Adventure
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-12 py-4 text-xl font-bold rounded-full">
                  Explore Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-black/40 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="relative">
              <Zap className="h-8 w-8 text-blue-400" />
              <div className="absolute inset-0 h-8 w-8 bg-blue-400 rounded-full blur-lg opacity-30"></div>
            </div>
            <span className="text-2xl font-bold gradient-text">Rural Connect</span>
          </div>
          <p className="text-gray-400 text-lg">
            Empowering rural communities through innovative ride sharing solutions
          </p>
        </div>
      </footer>
    </div>;
};
export default HomePage;
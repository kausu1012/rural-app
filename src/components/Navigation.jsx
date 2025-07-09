import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, Plus, BarChart3, User, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
const Navigation = () => {
  const location = useLocation();
  const navItems = [{
    path: '/',
    icon: Home,
    label: 'Home'
  }, {
    path: '/book-ride',
    icon: Search,
    label: 'Find Ride'
  }, {
    path: '/offer-ride',
    icon: Plus,
    label: 'Offer Ride'
  }, {
    path: '/dashboard',
    icon: BarChart3,
    label: 'Dashboard'
  }, {
    path: '/profile',
    icon: User,
    label: 'Profile'
  }];
  return <nav className="fixed top-0 left-0 right-0 z-50 nav-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <motion.div whileHover={{
            scale: 1.1,
            rotate: 5
          }} whileTap={{
            scale: 0.95
          }} className="flex items-center space-x-3">
              <div className="relative">
                <Zap className="h-10 w-10 text-blue-400" />
                <div className="absolute inset-0 h-10 w-10 bg-blue-400 rounded-full blur-lg opacity-30"></div>
              </div>
              <span className="text-2xl font-bold gradient-text">Madarchod Connect</span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-2">
            {navItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return <Link key={item.path} to={item.path}>
                  <motion.div whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }}>
                    <Button variant={isActive ? "default" : "ghost"} size="sm" className={`relative px-6 py-3 rounded-full transition-all duration-300 ${isActive ? 'btn-primary text-white shadow-lg' : 'hover:bg-white/10 text-gray-300 hover:text-white'}`}>
                      <Icon className="h-4 w-4 mr-2" />
                      {item.label}
                      {isActive && <motion.div layoutId="activeTab" className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full -z-10" initial={false} transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }} />}
                    </Button>
                  </motion.div>
                </Link>;
          })}
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="sm" className="text-white">
              <BarChart3 className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>;
};
export default Navigation;
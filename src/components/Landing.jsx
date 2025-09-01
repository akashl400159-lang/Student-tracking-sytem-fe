import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Users,
  Calendar,
  BookOpen,
  CreditCard,
  MessageSquare,
  ShieldCheck,
  Cloud,
  Zap,
  Check,
  Star,
  ArrowRight,
  Globe,
  Award,
  TrendingUp,
} from "lucide-react";

const LandingPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };
  const navigate = useNavigate();

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="font-sans text-slate-800 bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900">ZENDESK <span className="text-sm font-bold text-slate-900">By ITS Phoneix</span></span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-600 hover:text-slate-900 font-medium transition-colors text-decoration-none">Features</a>
            <a href="#advantages" className="text-slate-600 hover:text-slate-900 font-medium transition-colors text-decoration-none">Benifits</a>
            {/*<a href="#pricing" className="text-slate-600 hover:text-slate-900 font-medium transition-colors text-decoration-none">Pricing</a>
            <a href="#testimonials" className="text-slate-600 hover:text-slate-900 font-medium transition-colors text-decoration-none">Reviews</a>*/}
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium" onClick={() => navigate("/onBoard")}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/20 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp} className="max-w-xl">
              {/*<div className="inline-flex items-center bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Star className="w-4 h-4 mr-2" />
                Trusted by 500+ Educational Institutions
              </div>*/}
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Modern School
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}Management
                </span>
                <br />
                Made Simple
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed mb-8">
                Transform your educational institution with our comprehensive Student Management System.
                Streamline operations, enhance communication and empower learning outcomes with AI Support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl flex items-center justify-center group" onClick={() => navigate("/login")}>
                  Watch Demo
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                {/*} <button className="bg-white text-slate-700 px-8 py-4 rounded-xl hover:bg-slate-50 transition-colors font-semibold text-lg border-2 border-slate-200 hover:border-slate-300" >
                  Watch Demo
                </button>*/}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img src="/Dash2.png"></img>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { number: "N/A", label: "Schools Trust Us", icon: <Globe className="w-6 h-6" /> },
              { number: "N/A", label: "Students Managed", icon: <Users className="w-6 h-6" /> },
              { number: "N/A", label: "Uptime Guarantee", icon: <ShieldCheck className="w-6 h-6" /> },
              { number: "24/7", label: "Support Available", icon: <MessageSquare className="w-6 h-6" /> },
            ].map((stat, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-2">{stat.number}</h3>
                <p className="text-slate-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-20" {...fadeInUp}>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Everything You Need to Manage Your School
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools necessary for modern educational administration,
              designed with user experience and efficiency in mind.
            </p>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Advanced Analytics Dashboard",
                icon: <BarChart className="w-8 h-8 text-indigo-600" />,
                desc: "Real-time insights with interactive charts, attendance tracking, grade analytics, and performance metrics for data-driven decisions.",
                premium: false
              },

              {
                title: "Intelligent Timetabling",
                icon: <Calendar className="w-8 h-8 text-indigo-600" />,
                desc: "AI-powered schedule optimization, conflict detection, exam scheduling, and resource allocation management.",
                premium: true
              },
              {
                title: "Unified Communication Hub",
                icon: <MessageSquare className="w-8 h-8 text-indigo-600" />,
                desc: "Multi-channel communication with in-app messaging, SMS/email integration, announcements, and parent engagement tools.",
                premium: false
              },
              {
                title: "Complete Learning Management",
                icon: <BookOpen className="w-8 h-8 text-indigo-600" />,
                desc: "Assignment distribution, online submissions, grade book, resource library, and progress tracking system.",
                premium: true
              },
              {
                title: "Advanced AI Course Recommondation",
                icon: <BookOpen className="w-8 h-8 text-indigo-600" />,
                desc: "Assignment distribution, online submissions, grade book, resource library, and progress tracking system.",
                unique: true
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-indigo-200"
              >
                {feature.premium && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Premium
                  </div>
                )}
                <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-20" {...fadeInUp}>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Get Started in Three Simple Steps
            </h2>
            <p className="text-xl text-slate-600">
              Our streamlined onboarding process gets your school up and running quickly.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Quick Setup & Onboarding",
                desc: "Create your account and configure your school's basic information with our guided setup wizard. Import existing data or start fresh.",
                color: "from-blue-500 to-indigo-600"
              },
              {
                step: "02",
                title: "Configure Academic Structure",
                desc: "Set up classes, subjects, and academic calendar. Enroll students and teachers with bulk import tools and role-based access controls.",
                color: "from-indigo-500 to-purple-600"
              },
              {
                step: "03",
                title: "Launch & Monitor Operations",
                desc: "Begin daily operations with attendance tracking, fee management, and communication tools. Monitor progress with comprehensive analytics.",
                color: "from-purple-500 to-pink-600"
              },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="text-center relative"
              >
                <div className={`w-20 h-20 mx-auto mb-8 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <span className="text-white font-bold text-xl">{step.step}</span>
                </div>
                {idx < 2 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-slate-300 to-transparent"></div>
                )}
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed max-w-sm mx-auto">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}

      <section id="advantages" className="py-32 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-20" {...fadeInUp}>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Why Leading Schools Choose EduManage Pro
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Join hundreds of educational institutions that have transformed their operations with our platform.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-10">
            {[
              {
                icon: <Zap className="w-10 h-10" />,
                title: "Lightning Fast Performance",
                desc: "Built with modern technology stack ensuring rapid response times and seamless user experience across all devices.",
                gradient: "from-yellow-400 to-orange-500"
              },
              {
                icon: <Cloud className="w-10 h-10" />,
                title: "Enterprise-Grade Scalability",
                desc: "Grows with your institution from small schools to large university systems. Handle unlimited students, staff, and data.",
                gradient: "from-blue-400 to-indigo-500"
              },
              {
                icon: <ShieldCheck className="w-10 h-10" />,
                title: "Bank-Level Security",
                desc: "End-to-end encryption, regular security audits, GDPR compliance, and 99.9% uptime guarantee for peace of mind.",
                gradient: "from-green-400 to-emerald-500"
              },
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="group relative bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${benefit.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform`}>
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-slate-300 leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials 
      <section id="testimonials" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-20" {...fadeInUp}>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Trusted by Education Leaders
            </h2>
            <p className="text-xl text-slate-600">
              See what our clients say about their experience with EduManage Pro.
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { 
                quote: "EduManage Pro transformed our administrative efficiency. What used to take hours now takes minutes. The parent communication features have significantly improved our engagement rates.",
                name: "Dr. Priya Sharma", 
                role: "Principal, Delhi Public School", 
                rating: 5,
                image: "🏫"
              },
              { 
                quote: "The analytics dashboard provides incredible insights into student performance. We can now identify struggling students early and provide targeted support. Game-changing platform.",
                name: "Rajesh Kumar", 
                role: "Academic Director, Kendriya Vidyalaya", 
                rating: 5,
                image: "📊"
              },
              { 
                quote: "As a parent, I love being able to track my child's progress in real-time. The mobile app is intuitive and keeps me connected with teachers and school activities.",
                name: "Sneha Patel", 
                role: "Parent, Ryan International School", 
                rating: 5,
                image: "👩‍💼"
              },
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-100"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-slate-700 text-lg leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-2xl mr-4">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{testimonial.name}</div>
                    <div className="text-slate-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>*/}

      {/* Pricing 
      <section id="pricing" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-20" {...fadeInUp}>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Choose Your Plan
            </h2>
            <p className="text-xl text-slate-600">
              Flexible pricing options designed to fit schools of all sizes and budgets.
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { 
                name: "Starter", 
                price: "Free", 
                period: "for 30 days",
                features: [
                  "Up to 100 students",
                  "Basic attendance tracking",
                  "Parent communication",
                  "Email support",
                  "Mobile app access"
                ],
                highlight: false,
                cta: "Start Free Trial"
              },
              { 
                name: "Professional", 
                price: "₹4,999", 
                period: "per year",
                features: [
                  "Unlimited students",
                  "Full feature access",
                  "Advanced analytics",
                  "Fee management",
                  "Priority support",
                  "Data export tools",
                  "Custom reports"
                ],
                highlight: true,
                cta: "Get Started",
                popular: true
              },
              { 
                name: "Enterprise", 
                price: "₹9,999", 
                period: "per year",
                features: [
                  "Everything in Professional",
                  "Multi-campus support",
                  "Advanced customization",
                  "API access",
                  "Dedicated support",
                  "Training sessions",
                  "Custom integrations"
                ],
                highlight: false,
                cta: "Contact Sales"
              },
            ].map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className={`relative p-8 rounded-2xl border-2 transition-all duration-300 ${
                  plan.highlight 
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-2xl scale-105" 
                    : "bg-white text-slate-900 border-slate-200 hover:border-indigo-200 shadow-lg hover:shadow-xl"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className={`text-sm ml-2 ${plan.highlight ? 'text-indigo-200' : 'text-slate-500'}`}>
                      {plan.period}
                    </span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className={`w-5 h-5 mr-3 ${plan.highlight ? 'text-indigo-200' : 'text-green-500'}`} />
                      <span className={plan.highlight ? 'text-indigo-100' : 'text-slate-600'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <button
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                    plan.highlight
                      ? "bg-white text-indigo-600 hover:bg-indigo-50"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-32  bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your School's Future?
            </h2>
            <p className="text-xl mb-8 leading-relaxed">
              Join thousands of educational institutions that have revolutionized their operations with EduManage Pro.
              Start your free trial today and experience the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/*<button className="bg-white text-indigo-600 px-8 py-4 rounded-xl hover:bg-indigo-50 transition-colors font-semibold text-lg shadow-lg">
                Start Free 30-Day Trial
              </button>*/}
              <button className="bg-indigo-800 text-white px-8 py-4 rounded-xl hover:bg-indigo-900 transition-colors font-semibold text-lg border-2 border-indigo-700" onClick={() => navigate("/login")}>
                View Live Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-white-900">ZENDESK <span className="text-sm font-bold text-white-900">By ITS Phoneix</span></span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Empowering educational institutions with modern, efficient management solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#features" className="hover:text-white transition-colors text-decoration-none">Features</a></li>
                <li><a href="#advantages" className="hover:text-white transition-colors text-decoration-none">Benifits</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors text-decoration-none">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-decoration-none">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-decoration-none">Training</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-decoration-none">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors text-decoration-none">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-decoration-none">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-decoration-none">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} Zendesk. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
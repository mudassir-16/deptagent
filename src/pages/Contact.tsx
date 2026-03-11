import React from 'react';
import Layout from '../components/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We will get back to you soon.",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-department-dark">Contact Us</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div>
            <Card className="shadow-md">
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-xs sm:text-sm font-medium">Full Name</label>
                    <Input id="name" placeholder="Enter your name" required className="w-full focus:ring-2 focus:ring-department-purple" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-xs sm:text-sm font-medium">Email Address</label>
                    <Input id="email" type="email" placeholder="Enter your email" required className="w-full focus:ring-2 focus:ring-department-purple" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-xs sm:text-sm font-medium">Subject</label>
                    <Input id="subject" placeholder="Enter subject" required className="w-full focus:ring-2 focus:ring-department-purple" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-xs sm:text-sm font-medium">Message</label>
                    <Textarea id="message" placeholder="Type your message here..." rows={5} required className="w-full focus:ring-2 focus:ring-department-purple" />
                  </div>
                  
                  <Button type="submit" className="w-full bg-department-purple hover:bg-purple-800 focus:ring-2 focus:ring-purple-800">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="shadow-md">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Department Address</h2>
                <p className="text-gray-700">
                  Department of Information Technology,<br />
                  Vignan Institute of Technology and Science,<br />
                  Deshmukhi, Pochampally,<br />
                  Yadadri Bhuvanagiri District,<br />
                  Telangana - 508284
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="space-y-3">
                  <p className="flex items-center">
                    <span className="font-medium w-20">Phone:</span>
                    <span>+91 9494441877</span>
                  </p>
                  <p className="flex items-center">
                    <span className="font-medium w-20">Email:</span>
                    <span>vitsitonline1@vignanits.ac.in</span>
                  </p>
                  <p className="flex items-center">
                    <span className="font-medium w-20">Office:</span>
                    <span>Room No 413 , Fourth Floor</span>
                  </p>
                  <p className="flex items-center">
                    <span className="font-medium w-20">Hours:</span>
                    <span>8:30 AM - 5:00 PM (Monday to Saturday)</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;

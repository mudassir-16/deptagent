import React from 'react';
import { Calendar, Clock, MapPin, Eye, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface EventCardProps {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageSrc?: string;
  host?: string;
  onClick?: () => void;
}

const EventCard = ({ 
  title, 
  description, 
  date, 
  time, 
  location, 
  imageSrc, 
  host,
  onClick 
}: EventCardProps) => {
  return (
    <Card className="overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl border-none card-hover-effect h-full flex flex-col">
      {imageSrc && (
        <div className="h-48 overflow-hidden">
          <img 
            src={imageSrc} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/400x200?text=Event+Image";
            }}
          />
        </div>
      )}
      <CardContent className="p-6 flex flex-col flex-grow">
        {/* <div className="bg-department-purple/5 p-1 inline-block rounded-md text-xs font-medium text-department-purple mb-2">Upcoming Event</div> */}
        <h3 className="text-xl font-bold font-heading mb-3 text-department-dark">{title}</h3>
        <p className="text-gray-600 mb-5 line-clamp-3">{description}</p>
        <div className="space-y-2 text-sm mb-5 mt-auto">
          <div className="flex items-center text-gray-700">
            <Calendar className="h-4 w-4 mr-2 text-department-purple" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Clock className="h-4 w-4 mr-2 text-department-purple" />
            <span>{time}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <MapPin className="h-4 w-4 mr-2 text-department-purple" />
            <span>{location}</span>
          </div>
          {host && (
            <div className="flex items-center text-gray-700">
              <User className="h-4 w-4 mr-2 text-department-purple" />
              <span>Host: {host}</span>
            </div>
          )}
        </div>
        <Button 
          variant="outline" 
          className="w-full border-department-purple text-department-purple hover:bg-department-purple hover:text-white flex items-center justify-center gap-2 group"
          onClick={onClick}
        >
          <Eye className="h-4 w-4 transition-transform group-hover:scale-110" />
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;

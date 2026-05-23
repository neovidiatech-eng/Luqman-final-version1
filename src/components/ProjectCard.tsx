'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Building2, Calendar, TrendingUp } from 'lucide-react';
import type { Project } from '../data/properties';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const ProjectPlaceholder = () => (
  <div className="w-full h-full gradient-primary flex items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
      {/* Skyline decoration */}
      <svg viewBox="0 0 200 80" fill="none" className="absolute bottom-0 w-full opacity-20">
        <rect x="10" y="40" width="20" height="40" fill="white"/>
        <rect x="35" y="25" width="15" height="55" fill="white"/>
        <rect x="55" y="35" width="25" height="45" fill="white"/>
        <rect x="85" y="15" width="20" height="65" fill="white"/>
        <rect x="110" y="30" width="18" height="50" fill="white"/>
        <rect x="133" y="20" width="22" height="60" fill="white"/>
        <rect x="160" y="35" width="16" height="45" fill="white"/>
      </svg>
    </div>
    <svg viewBox="0 0 80 60" fill="none" className="w-20 h-16 relative z-10 opacity-50">
      <rect x="10" y="20" width="60" height="40" rx="4" fill="white" fillOpacity="0.3"/>
      <rect x="20" y="10" width="40" height="50" rx="4" fill="white" fillOpacity="0.5"/>
      <rect x="30" y="5" width="20" height="55" rx="4" fill="white" fillOpacity="0.7"/>
      <circle cx="60" cy="12" r="6" fill="#C19F42"/>
    </svg>
  </div>
);

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const coverImage = project.images?.[0] || '';
  const statusColor =
    project.deliveryStatus === 'مكتمل' ? 'bg-emerald-500' :
    project.deliveryStatus === 'قيد الإنشاء' ? 'bg-amber-500' : 'bg-blue-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(3,76,43,0.08)] hover:shadow-[0_20px_60px_rgba(3,76,43,0.16)] transition-shadow duration-300 group"
    >
      {/* Image */}
      <Link href={`/projects/${project.slug}`} className="relative h-52 overflow-hidden block">
        {coverImage ? (
          <img src={coverImage} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <ProjectPlaceholder />
        )}
        <div className="absolute top-3 right-3 flex gap-2">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full text-white ${statusColor}`}>
            {project.deliveryStatus}
          </span>
        </div>
        <div className="absolute top-3 left-3">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gold text-white">
            {project.type}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <Link href={`/projects/${project.slug}`}>
          <h3 className="font-bold text-base text-primary-dark mb-1.5 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
        </Link>
        <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
          <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
          <span>{project.location}، {project.city}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-cream rounded-xl p-3 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-primary shrink-0" />
            <div>
              <p className="text-xs text-gray-400">الوحدات</p>
              <p className="text-sm font-bold text-primary-dark">{project.units} وحدة</p>
            </div>
          </div>
          <div className="bg-cream rounded-xl p-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary shrink-0" />
            <div>
              <p className="text-xs text-gray-400">الحالة</p>
              <p className="text-xs font-bold text-primary-dark leading-tight">{project.deliveryStatus}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">يبدأ من</p>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-gold" />
              <p className="text-base font-extrabold text-primary">
                {project.startingPrice.toLocaleString('ar-SA')} ريال
              </p>
            </div>
          </div>
          <Link
            href={`/projects/${project.slug}`}
            className="btn-gold text-sm font-bold px-4 py-2 rounded-xl"
          >
            تفاصيل المشروع
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

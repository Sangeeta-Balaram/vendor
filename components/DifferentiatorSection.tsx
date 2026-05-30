'use client'
import { motion } from 'framer-motion'
import { Infinity, Palette, Cpu, Feather, Eye, FileText, Target, Globe, Smartphone, Zap, Shield } from 'lucide-react'

const creativeItems = [
  { id: 'branding', label: <>Branding &<br />Identity</>, icon: <Feather className="w-4 h-4" /> },
  { id: 'visual', label: <>Visual<br />Design</>, icon: <Eye className="w-4 h-4" /> },
  { id: 'content', label: <>Content &<br />Storytelling</>, icon: <FileText className="w-4 h-4" /> },
  { id: 'marketing', label: <>Marketing<br />Strategy</>, icon: <Target className="w-4 h-4" /> },
]

const techItems = [
  { id: 'ai', label: <>AI &<br />Machine Learning</>, icon: <Cpu className="w-4 h-4" /> },
  { id: 'web', label: <>Web &<br />App Development</>, icon: <Globe className="w-4 h-4" /> },
  { id: 'automation', label: <>Automation</>, icon: <Zap className="w-4 h-4" /> },
  { id: 'cloud', label: <>Cloud &<br />Security</>, icon: <Shield className="w-4 h-4" /> },
]

export default function DifferentiatorSection() {
  return (
    <section className="pt-2 pb-16 md:pb-24 px-4 sm:px-6">
      <div className="max-w-[1100px] mx-auto">
        <h2 className="text-center text-[28px] md:text-[32px] font-extrabold tracking-[-.03em] mb-12 bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">The perfect blend of creativity &amp; technology</h2>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-700/[0.06] via-transparent to-blue-700/[0.06] rounded-[24px]" />
          <div className="grid md:grid-cols-2 gap-0 relative">
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-white rounded-l-[24px] p-6 shadow-soft relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/[0.04] to-transparent" />
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-800 to-purple-500" />
              <div className="flex items-center gap-3 mb-4 relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-700 to-purple-900 flex items-center justify-center">
                  <Palette className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-bold bg-gradient-to-r from-purple-800 to-purple-600 bg-clip-text text-transparent">Creative Excellence</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 relative">
                {creativeItems.map(item => (
 <div key={item.id} className="flex flex-col items-center gap-1">
                     <span className="text-purple-500">{item.icon}</span>
                     <span className="text-[11px] font-semibold text-gray-600 text-center leading-tight">{item.label}</span>
                   </div>
                 ))}
               </div>
             </motion.div>

             <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex-col items-center gap-2">
               <div className="w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center border-[6px] border-white">
                 <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-700 to-blue-700 flex items-center justify-center">
                   <Infinity className="w-8 h-8 text-white" />
                 </div>
               </div>
               <span className="text-[8px] font-bold text-gray-400 uppercase tracking-[.25em]">Blend</span>
             </div>

             <motion.div
               initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
               className="bg-white rounded-r-[24px] p-6 shadow-soft relative overflow-hidden"
             >
               <div className="absolute inset-0 bg-gradient-to-l from-blue-500/[0.04] to-transparent" />
               <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 to-blue-800" />
               <div className="flex items-center justify-end gap-3 mb-4 relative">
                 <h3 className="text-sm font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Technology Power</h3>
                 <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center">
                   <Cpu className="w-4 h-4 text-white" />
                 </div>
               </div>
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 relative">
                 {techItems.map(item => (
                    <div key={item.id} className="flex flex-col items-center gap-1">
                     <span className="text-blue-500">{item.icon}</span>
                     <span className="text-[11px] font-semibold text-gray-600 text-center leading-tight">{item.label}</span>
                   </div>
                 ))}
               </div>
            </motion.div>
          </div>

          <div className="absolute -bottom-4 left-[15%] right-[15%] h-6 bg-gradient-to-r from-purple-700/20 via-blue-700/20 to-purple-700/20 blur-xl rounded-full" />
        </div>
      </div>
    </section>
  )
}

// import React from 'react';

// interface BrandLogoProps {
//   size?: 'sm' | 'md' | 'lg';
//   className?: string;
// }

// export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', className = '' }) => {
//   const sizes = {
//     sm: { icon: 40, text: 'text-lg' },
//     md: { icon: 56, text: 'text-2xl' },
//     lg: { icon: 72, text: 'text-3xl' },
//   };

//   const { icon, text } = sizes[size];

//   return (
//     <div className={`flex flex-col items-center ${className}`}>
//       {/* Logo Icon - Stylized mountain with moon */}
//       <svg 
//         width={icon} 
//         height={icon} 
//         viewBox="0 0 80 80" 
//         fill="none" 
//         xmlns="http://www.w3.org/2000/svg"
//         className="mb-2"
//       >
//         {/* Outer circle */}
//         <circle cx="40" cy="40" r="28" stroke="hsl(40 45% 65%)" strokeWidth="1.5" fill="none" />
        
//         {/* Inner decorative arc */}
//         <path 
//           d="M20 48 Q30 35 40 42 Q50 49 60 38" 
//           stroke="hsl(40 45% 65%)" 
//           strokeWidth="1.5" 
//           fill="none"
//         />
        
//         {/* Mountain silhouette */}
//         <path 
//           d="M25 52 L35 38 L42 44 L50 32 L58 52 Z" 
//           fill="hsl(40 45% 65%)"
//           opacity="0.9"
//         />
        
//         {/* Moon/sun arc */}
//         <path 
//           d="M30 28 Q40 18 50 28" 
//           stroke="hsl(40 45% 65%)" 
//           strokeWidth="1.5" 
//           fill="none"
//         />
//       </svg>
      
//       {/* Brand text */}
//       <div className="flex items-center gap-1">
//         <span className={`font-serif text-brand-gold ${text} tracking-wider`}>瑶</span>
//         <span className="text-brand-gold opacity-50">|</span>
//         <span className={`font-serif text-brand-gold ${text} tracking-wider`}>光</span>
//         <span className="text-brand-gold opacity-50">|</span>
//         <span className={`font-serif text-brand-gold ${text} tracking-wider`}>阁</span>
//       </div>
      
//       {/* English text */}
//       <span className="text-brand-gold/70 text-xs tracking-[0.3em] mt-1">YAO GUANG GE</span>
//     </div>
//   );
// };

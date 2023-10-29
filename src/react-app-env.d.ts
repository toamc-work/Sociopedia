// / <reference types="react-scripts" />
import { Palette, TypeBackground } from '@mui/material'  
declare module '@mui/material' {
    interface Palette {
        neutral: {
            dark?: string;
            main?: string;
            mediumMain?: string;
            medium?: string;
            light?: string;
        }
    }

    interface TypeBackground {
        alt:string;
    }
}

declare module 'react-dropzone' {
    interface DropzoneProps {
        acceptedFields: string;
    }
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
import tw from 'tailwind-styled-components';
import { FC } from 'react';

import { ButtonProps } from 'interfaces/ui';

export const Button: FC<ButtonProps> = tw.button`
flex justify-center items-center rounded-3xl transition-all duration-200 bg-blue-500 text-white font-bold text-base py-1 hover:bg-blue-600
 text-white font-bold hover:shadow focus:shadow

    ${(props) => props.className}
`;

export const ButtonDark: FC<ButtonProps> = tw.button`
    btn w-full bg-dark border-0
    ${(props) => props.className}
`;

export const ButtonSearchPrimary: FC<any> = tw.button`
    btn-search bg-blue-500 rounded-r-3xl
`;

export const ButtonSearch: FC<any> = tw.button`
    ${(props) => props.className}
    btn btn-ghost btn-circle sm:hidden 
`;

export const ButtonDanger: FC<any> = tw.button`
    ${(props) => props.className}
    btn-danger px-4 py-2 text-white font-bold text-sm rounded-md 
`;

export const ButtonPrimary: FC<any> = tw.button`
    ${(props) => props.className}
    btn-success px-4 py-2 text-white font-bold rounded-md text-sm  
`;

export const ButtonSmall: FC<any> = tw.button`
    bg-red-500 w-max px-3 py-1  self-end text-white font-bold text-sm rounded-b-md mr-2  hover:bg-red-600
`;

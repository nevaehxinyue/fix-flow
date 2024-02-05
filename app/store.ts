import {create } from 'zustand';

interface MenuDialogState {
    isMenuOpen: boolean;
    setIsMenuOpen: (open: boolean) => void;
    isDialogOpen: boolean;
    setIsDialogOpen: (open: boolean) => void;
}

export const useMenuDialogStore = create<MenuDialogState>((set)=> ({
    isMenuOpen: false,
    setIsMenuOpen: (open: boolean) => set(()=> ({isMenuOpen: open})),
    isDialogOpen: false,
    setIsDialogOpen: (open: boolean) => set(() => ({isDialogOpen: open})),
    
}))
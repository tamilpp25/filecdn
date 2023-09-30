'use client'
import axios from 'axios';
import prisma from './prisma'

export const getFileInfo = async (fileId: string): Promise<any> => {
    try {
        const file = await axios.get(`/api/file/fetch?id=${fileId}`)

        if (!file) return;
    
        return file.data;
    } catch(e) {
        console.error(e)
        return;
    }
    
}
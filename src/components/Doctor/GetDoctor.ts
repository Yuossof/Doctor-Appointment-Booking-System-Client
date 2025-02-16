'use client';
import React, { useEffect } from 'react'
import { usePageNumber } from '../Context/PageNumberReviews';
import { useTotalPagesReviews } from '../Context/TotalPagesReviews';
import { useDoctor } from '../Context/Doctor';

export default function GetDoctor({ id }: { id: string }) {
    const pageNumberReviewsContext = usePageNumber();
    const totalPagesReviewsContext = useTotalPagesReviews();
    const contextDoctor = useDoctor();
    console.log()

    useEffect(() => {
        const fetchOnDoctor = async () => {
            try {
                const res = await fetch(`http://localhost:8000/api/users/get-doctors/show/${id}?page=${pageNumberReviewsContext?.pageNumber}`, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                const data = await res.json();
                totalPagesReviewsContext?.setTotalPage(data.data.totalPages);
                contextDoctor?.setDoctor(data.data.doctor);
            } catch (error) {
                console.log(error)
            }
        }
        fetchOnDoctor()
    }, [pageNumberReviewsContext?.pageNumber, contextDoctor?.doctor])
    return null;
}

'use client';
import { useEffect } from 'react'
import { usePageNumber } from '../../Context/PageNumberReviews';
import { useTotalPagesReviews } from '../../Context/TotalPagesReviews';
import { useDoctor } from '../../Context/Doctor';

export default function GetDoctor({ id }: { id: string }) {
    const pageNumberReviewsContext = usePageNumber();
    const totalPagesReviewsContext = useTotalPagesReviews();
    const contextDoctor = useDoctor();

    useEffect(() => {
        const fetchOnDoctor = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/get-doctors/show/${id}?page=${pageNumberReviewsContext?.pageNumber}`, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                const data = await res.json();
                totalPagesReviewsContext?.setTotalPage(data?.data?.totalPages);
                contextDoctor?.setDoctor(data?.data?.doctor);
            } catch (error) {
                console.log(error)
            }
        }
        fetchOnDoctor()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumberReviewsContext?.pageNumber, totalPagesReviewsContext?.totalPage, pageNumberReviewsContext?.deleteReview])
    return null;
}

'use client';

import { useEffect, useState } from "react";
<<<<<<< HEAD
import { useTotalPagesReviews } from "../../Context/TotalPagesReviews";
import { usePageNumber } from "../../Context/PageNumberReviews";
=======
import { useTotalPagesReviews } from "../Context/TotalPagesReviews";
import { usePageNumber } from "../Context/PageNumberReviews";
import { useDoctor } from "../Context/Doctor";
>>>>>>> 145465f22c3fbf7aa088f167a43803998574d110

export default function DoctorsPagination() {
    const totalPages = useTotalPagesReviews();
    const [page, setPage] = useState<number>(1);
    const pageNumberContext = usePageNumber();
    const [rangeStart, setRangeStart] = useState<number>(1);
    const [disabledPrev, setDisabledPrev] = useState<boolean>(true);
    const [disabledNext, setDisabledNext] = useState<boolean>(false);
    const { doctor } = useDoctor();
    const visibleRange = 2; 

    useEffect(() => {
        setDisabledPrev(page === 1);
        setDisabledNext(page === totalPages.totalPage);
    }, [page, totalPages.totalPage]);

    useEffect(() => {
        pageNumberContext?.setPageNumber(page);
    }, [page])

    const handleButton = (action: string) => {
        setPage((prevPage) => {
            let newPage = prevPage;
            if (action === 'prev' && prevPage > 1) {
                newPage = prevPage - 1;
            } else if (action === 'next' && prevPage < totalPages.totalPage) {
                newPage = prevPage + 1;
            }

            updateRangeStart(newPage);
            return newPage;
        });
    };

    const handleClickNum = (num: number) => {
        setPage(num);
        updateRangeStart(num);
    };

    const updateRangeStart = (newPage: number) => {
        if (newPage > rangeStart + visibleRange - 1) {
            setRangeStart(Math.min(newPage - visibleRange + 1, totalPages.totalPage - visibleRange));
        } else if (newPage < rangeStart) {
            setRangeStart(Math.max(newPage, 1));
        }
    };

    const handleDotsClick = (position: "start" | "end") => {
        if (position === "start") {
            setRangeStart((prev) => Math.max(1, prev - 2));
        } else {
            setRangeStart((prev) => Math.min(totalPages.totalPage - visibleRange, prev + 2));
        }
    };

    const getPageNumbers = (): (number | string)[] => {
        const pages: (number | string)[] = [];

        if (totalPages.totalPage <= 5) {
            for (let i = 1; i <= totalPages.totalPage; i++) {
                pages.push(i);
            }
        } else {
            if (rangeStart > 1) pages.push(1);
            if (rangeStart > 2) pages.push("...");

            for (let i = rangeStart; i < rangeStart + visibleRange; i++) {
                if (i > totalPages.totalPage) break;
                pages.push(i);
            }

            if (rangeStart + visibleRange < totalPages.totalPage - 1) pages.push("...");
            if (rangeStart + visibleRange <= totalPages.totalPage) pages.push(totalPages.totalPage);
        }

        return pages;
    };

    return (
        <>
        { doctor?.reviews && doctor?.reviews.data.length > 0 && (
            <ul className="flex justify-center items-center gap-3 bg-blue-50 p-1 rounded-md">
                <button disabled={disabledPrev} onClick={() => handleButton('prev')}
                    className="disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-mid-blue rounded-md bg-[#f6f6f6] px-4 py-2 hover:bg-mid-blue hover:text-white transition-all duration-300 ease-out text-mid-blue">
                    Prev
                </button>

                {getPageNumbers().map((num, index) => (
                    typeof num === "number" ? (
                        <li key={index} onClick={() => handleClickNum(num)}
                            className={`${page === num ? 'bg-mid-blue text-white' : 'bg-[#f6f6f6] text-mid-blue'} 
                            rounded-md px-4 py-2 hover:bg-mid-blue hover:text-white transition-all duration-300 ease-out cursor-pointer`}>
                            {num}
                        </li>
                    ) : (
                        <li key={index} className="px-2 cursor-pointer text-gray-500" onClick={() => handleDotsClick(num === "..." && index < 2 ? "start" : "end")}>
                            ...
                        </li>
                    )
                ))}

                <button disabled={disabledNext} onClick={() => handleButton('next')}
                    className="disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-mid-blue rounded-md bg-[#f6f6f6] px-4 py-2 hover:bg-mid-blue hover:text-white transition-all duration-300 ease-out text-mid-blue">
                    Next
                </button>
            </ul>
        ) }
        
        </>
    );
}

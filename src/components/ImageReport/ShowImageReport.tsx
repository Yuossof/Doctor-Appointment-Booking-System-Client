"use client";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Image from "next/image";
import { useShowReportImage } from "@/Context/DoctorsFilter/ShowReportImage";
import { X } from "lucide-react";

export default function ShowImageReport() {
  const ShowImage = useShowReportImage();

  return (
    <>
      {ShowImage?.image && ShowImage?.showReportImage && (
        <div
          className="w-full cursor-pointer fixed h-full left-0 top-0 bg-slate-50 z-[100] flex flex-col-reverse gap-4 items-center justify-center"
        onClick={() => ShowImage?.setShowReportImage(false)} 
        >
          <X
            className="fixed right-[10px] top-[10px] cursor-pointer z-[100]"
            onClick={(e) => {
              ShowImage?.setShowReportImage(false);
              e.stopPropagation(); 
            }}
          />

          <TransformWrapper>
            {({ zoomIn, zoomOut }) => (
              <>
                <div className="flex gap-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={(e) => {
                      zoomIn();
                      e.stopPropagation();
                    }}
                  >
                    +
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={(e) => {
                      zoomOut();
                      e.stopPropagation();
                    }}
                  >
                    -
                  </button>
                </div>

                <div className="cursor-pointer w-full flex justify-center mt-8"
                  onClick={(e) => e.stopPropagation()} 
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <TransformComponent>
                    <Image
                      width={600}
                      height={600}
                      src={ShowImage?.image}
                      alt="Medical report"
                      className="w-full max-w-full h-[600px] rounded-lg shadow-md border-2 cursor-pointer"
                    />
                  </TransformComponent>
                </div>
              </>
            )}
          </TransformWrapper>
        </div>
      )}
    </>
  );
}

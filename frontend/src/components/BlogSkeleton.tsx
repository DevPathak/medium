import { Circle } from "./BlogCard"

export const BlogSkeleton = () => {
    return <div role="status" className="animate-pulse">
        <div className="pt-10 border-b border-slate-200 pb-8 w-screen max-w-screen-sm cursor-pointer">
            <div className="flex">
                <div className="h-4 w-4 bg-gray-200 rounded-full w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                <div className="flex justify-center flex-col pl-2 flex justify-center flex-col">
                    <Circle />
                </div>
                <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                </div>
            </div>
            <div className="text-xl font-semibold pt-2">
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
            <div className="text-md font-thin">
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
            <div className="text-slate-500 text-sm font-thin pt-4">
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
        </div>
        <span className="sr-only">Loading...</span>
    </div>
    
    
    
}


export const SingleBlogSkeleton = () => {
    return <div className="flex justify-center mt-8">
    <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
        <div className="col-span-8">
            <div className="text-5xl font-extrabold">
                <div className="h-20 bg-gray-200 rounded mb-4"></div>
            </div>
            <div className="text-slate-500 pt-2">
                <div className="h-2.5 bg-gray-200 rounded-full mb-4"></div>
            </div>
            <div className="pt-4">
            <div className="h-2.5 bg-gray-200 rounded-full mb-4"></div>
            </div>
        </div>
        <div className="col-span-4">
            <div className="text-slate-600 text-lg">
            <div className="h-2.5 bg-gray-200 rounded-full w-15 mb-4"></div>
            </div>
            <div className="flex">
                <div className="pr-4 flex flex-col justify-center">
                <div className="h-2.5 bg-gray-200 rounded-full mb-4"></div>
                </div>
                <div>
                    <div className="text-xl font-bold">
                    <div className="h-2.5 bg-gray-200 rounded-full mb-4"></div>
                    </div>
                    <div className="pt-2 text-slate-500">
                        Master of mirth, purveyor of puns, and the funniest person in the kingdom.
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
}
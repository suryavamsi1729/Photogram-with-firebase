import Layout from "@/components/layout/layout";
import useLocalStorage from "@/hooks/useLocalStorage";
import useThrottle from "@/hooks/useThrottle";
import { AppDispatch } from "@/store/reducers";
import { selectPostsWithProfilesState } from "@/store/selectors";
import { fetchNextPostsProfiles, fetchPostsProfiles } from "@/store/thunk";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";


type PostType = "photo" | "video" | "reel" | "story";




const Explorer: React.FC = () => {
    const [userId,] = useLocalStorage<string | null>("uid",null);
    const dispatch:AppDispatch = useDispatch();
    const {posts,lastDoc} = useSelector(selectPostsWithProfilesState);
    const [search, setSearch] = useState("");
    const [filter, ] = useState<PostType | "all">("all");
    const containerRef = useRef<HTMLDivElement>(null);
    const handleScroll = useThrottle(() => {
        // Get current scroll position and dimensions
        const scrollTop = document.documentElement.scrollTop || window.pageYOffset;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = window.innerHeight;
        const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
        if (scrollPercent >= 90) {
            dispatch(fetchNextPostsProfiles(10,posts[posts.length-1].date,lastDoc));
        }
      }, 300);
    useEffect(()=>{
        if(userId){
            dispatch(fetchPostsProfiles(10));
        }

    },[userId]);

    useEffect(()=>{
        window.addEventListener('scroll', handleScroll);
        // Cleanup on unmount
        return () => window.removeEventListener('scroll', handleScroll);
    },[handleScroll]);
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.profile?.name.toLowerCase().includes(search.toLowerCase()) ||
        post.caption?.toLowerCase().includes(search.toLowerCase());

      return matchesSearch ;
    });
  }, [search, filter]);

  return (
    <Layout>
    <div className="w-full px-4">
      {/* Search + Filter Bar */}
      <div className=" sticky top-16 py-4 z-50 bg-[#09090B] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search posts by name or caption..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 rounded-full bg-[#18181B] text-white border-2 border-white hover:border-[#E64595] outline-none"
        />

        {/* Filters */}
        {/* <div className="flex flex-wrap gap-2">
          {["all", "photo", "video", "reel", "story"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as PostType | "all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition border-none outline-none ${
                filter === f
                  ? "bg-[#E64595] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-[#E64595] hover:text-white"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div> */}
      </div>

      {/* Pattern Grid */}
      <div ref={containerRef} className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] auto-rows-[200px] md:auto-rows-[280px] py-2">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => {
            // every 3rd and 6th post spans 2 rows
            const spanClass =
                    ((index + 1 - 3) % 10 === 0 || (index + 1 - 6) % 10 === 0)
                    ? "row-span-2"
                    : "";
            return (
              <div
                key={post.id}
                className={`relative group overflow-hidden bg-white shadow hover:shadow-lg transition ${spanClass}`}
              >
                <img
                  src={post?.photos[0]?.cdnUrl || undefined}
                  alt={post.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-2 text-white">
                  <span className="font-semibold">{post?.profile?.name}</span>
                  <span className="text-sm truncate">{post.caption}</span>
                </div>
              </div>
            );
          })
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No posts found.
          </p>
        )}
      </div>
    </div>
    </Layout>
  );
};

export default Explorer;

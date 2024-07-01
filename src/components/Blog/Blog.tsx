import { useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import styles from "./Blog.module.scss";
import BlogItem, { BlogItemProps } from "./BlogItem/BlogItem";
import { axiosGet } from "../APIs/AxiosInstance";
import useUserContext from "../Context/UserContext";

export default function Blog() {
  const userContext = useUserContext();
  const [loading, setLoading] = useState(true)
  const [blogItems, setBlogItems] = useState<BlogItemProps[]>([])
  useEffect(() => {
    axiosGet("/api/blog/", userContext)
      .then((res) => {
        setBlogItems(res.results)
        console.log(blogItems);
        setLoading(false)
      })
      .catch((error) => {
        console.error(error);
      });
  },[])
    return (
      <>
        <div className={`grid grid-cols-12 gap-1 ${styles["viewHeight"]}`}>
          <div className="col-span-2 text-xl bg-gray-500">
            <SideBar />
          </div>
          <div className="col-span-10 grid grid-cols-10 gap-3 bg-slate-200">
            {/* <BlogItem /> */}
            {!loading ? blogItems.map((blog) => (
              <div className="col-span-3 w-max mx-auto">
                <BlogItem
                  key={blog.id}
                  title={blog.title}
                  description={blog.description}
                  slug={blog.slug}
                  username={blog.username}
                />
              </div>
            )): <h1>Loading...</h1>}
          </div>
        </div>
      </>
    );
}
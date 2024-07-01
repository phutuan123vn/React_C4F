/* eslint-disable @typescript-eslint/no-explicit-any */
import useUserContext from "@/components/Context/UserContext";
import { useEffect, useRef, useState } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import styles from "./style.module.scss";
import { axiosGet } from "@/components/APIs/AxiosInstance";
import { MdThumbUpAlt } from "react-icons/md";

interface BlogDetailProps {
  id: number;
  title: string;
  description: string;
  username: string;
  level: string[];
  liked: boolean;
  likes: number;
  created_at: string;
}

interface IComment {
  id: number;
  username: string;
  comment: string;
  created_at: string;
}

interface CommentProps {
  next: string | null;
  previous: string | null;
  results: Array<IComment>;
}



export default function BlogDetail() {
    // const [comment, setComment] = useState<string>("");
    const [comments,setComments] = useState<CommentProps>({next:null,previous:null,results:[]} as CommentProps);
    const [blogDetail, setBlogDetail] = useState<BlogDetailProps>();
    const [likedBlog,setLikedBlog] = useState<boolean>(false);
    const navigate = useNavigate();
    const commentRef = useRef<HTMLInputElement>(null);
    const {slug} = useParams();
    const context = useUserContext();
    useEffect(() => {
        axiosGet(`/api/blog/${slug}/`, context)
          .then((res) => {
            const {blog,liked,comments} = res
            const blogDetail: BlogDetailProps = {
              ...blog,
            }
            console.log(blogDetail);
            setLikedBlog(liked);
            setBlogDetail(blogDetail);
            console.log(comments)
            console.log(typeof comments)
            setComments(comments);
          })
          .catch((err) => {
            console.log(err);
          });
    },[])

    const handleSendComment = () => {
        const user = context.token && redirect("/account/sign-in");
        if (!user) return navigate("/account/sign-in");
        const comment = commentRef.current?.value.trim();
        if(comment){
            // axios.post(`${API_URL}/api/comment/`, {
            //     value: comment,
            // },{
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     }
            // }).then((res) => {
            //     console.log(res.data);
            // }).catch((err) => {
            //     console.log(err);
            // })
            console.log(comment);
        }
    }
    const handleLiked = () => {
      setLikedBlog(!likedBlog);
    }
    return (
      blogDetail && (
        <div className="container relative mx-auto mt-3 bg-slate-100 rounded-lg px-4 py-4">
          <div>
            <h1 className="font-serif text-3xl">{blogDetail.title}</h1>
            <div className="flex justify-between">
              <span>{blogDetail.username}</span>
              <h5 className="italic">Created at: {blogDetail.created_at}</h5>
            </div>
            <h3>Level: {blogDetail.level}</h3>
            <h2>Description: {blogDetail.description}</h2>
            <p className="text-2xl text-balance px-4 py-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur a dolore reiciendis, sint, perspiciatis minima
              similique, nostrum qui delectus earum modi. Repellat odit in velit
              natus, quos iusto ullam quod! Dolor nisi incidunt porro a ducimus
              reprehenderit quos cumque cum, nesciunt modi adipisci enim
              consequatur totam neque, velit harum quam voluptate rerum dolorum
              ex maiores. Cum iure corporis eligendi eaque! Natus quae quis
              atque, vero, esse ratione magnam cum est iste velit odit.
              Obcaecati, explicabo itaque eos quam soluta sed praesentium error
              minima voluptatibus dolor, unde expedita quo quasi natus. Odio
              asperiores adipisci laudantium ea eligendi voluptates maiores
              excepturi deleniti dolor blanditiis iste praesentium corrupti
              alias quaerat dolore corporis possimus est ipsa laborum eum
              molestiae reprehenderit ratione, doloremque reiciendis! Molestias.
              Tempore et nam praesentium exercitationem ipsum aspernatur nulla,
              voluptatibus iste perspiciatis cumque autem cupiditate ullam
              tempora quidem a dignissimos deserunt sapiente ex inventore,
              doloremque illo quisquam. Ab magni consequatur accusantium?
              Quisquam sit perferendis odit dignissimos doloremque aliquam velit
              modi libero earum officiis est suscipit illum placeat, enim
              reiciendis saepe autem, sed ipsum cumque sapiente inventore!
              Tempore nulla consectetur modi sapiente. Commodi, qui. Nobis
              consequatur dicta perspiciatis, tenetur quod aperiam unde, est
              excepturi magni repudiandae nam fuga! Necessitatibus iure sit ab
              voluptatibus velit nemo sapiente, quo nulla voluptatem
              consequuntur dolorum hic? Velit provident assumenda illo nulla
              ratione eligendi temporibus mollitia, corporis libero odio
              perferendis numquam blanditiis aspernatur non necessitatibus,
              consectetur qui magnam. Eaque, expedita! Esse quae, suscipit nobis
              provident explicabo doloremque! Rem aperiam, quibusdam repellat
              odit fugit ex eligendi id quod voluptate corrupti eaque dicta!
              Porro quae error, ea, tempore magnam, maiores ex autem eius ad
              dolores impedit cumque exercitationem repellat? Non odio ipsum,
              unde illum esse enim modi aliquid! Praesentium magnam nisi
              accusantium dignissimos earum eligendi, sint, vero, itaque
              consequuntur iusto ipsa dolor voluptatem deleniti. Quaerat,
              consequuntur. Officia, ipsam odit.
            </p>
          </div>
          <div
            className={`${styles["div-send-comment"]} flex gap-3 py-4 items-center border-2 rounded-lg px-2 text-xl backdrop-blur-md shadow-md`}
          >
            <button
              className="hover:scale-125 transition ease-in-out transform active:rotate-12"
              onClick={handleLiked}
            >
              <MdThumbUpAlt
                size={40}
                className={likedBlog ? "text-cyan-400" : ""}
              />
            </button>
            <label htmlFor="value">Comment:</label>
            <input
              className="w-full px-4 border-2 rounded-lg"
              name="value"
              type="text"
              ref={commentRef}
            />
            <button
              className={`px-4 py-1 rounded-xl border-2 ${styles["button-send-comment"]}`}
              onClick={handleSendComment}
            >
              Send
            </button>
          </div>
          {comments && (
            <div
              className={`absolute px-4 w-full right-0 rounded-lg pt-2 overflow-y-auto ${styles["blog-comment"]}`}
            >
              <h3 className="italic">Comments</h3>
              {comments.results.map((comment: IComment) => (
                <div
                  key={comment.id}
                  className={`bg-slate-200 rounded-lg px-4 py-2 my-2 ${styles["comment"]}`}
                >
                  <h4>{comment.username}</h4>
                  <p>{comment.comment}</p>
                  <h5>{comment.created_at}</h5>
                </div>
                // <div className="flex gap-3 w-full rounded-lg border-2 px-4 py-1 bg-zinc-400 ">
                //   <h4>{comment.username}: </h4>
                //   <p>{comment.comment}</p>
                // </div>
                // {comment}
              ))}
            </div>
          )}
        </div>
      )
    );
}
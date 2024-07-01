import useUserContext from "@/components/Context/UserContext";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import styles from "./style.module.scss";
import { axiosGet } from "@/components/APIs/AxiosInstance";
import { MdThumbUpAlt } from "react-icons/md";
import assert from "assert";

interface BlogDetailProps {
  id: number;
  title: string;
  description: string;
  username: string;
  level: string[];
  liked: boolean;
  comments: Record<string, any>[]
}

export default function BlogDetail() {
    // const [comment, setComment] = useState<string>("");
    const [blogDetail, setBlogDetail] = useState<any>(null);
    const navigate = useNavigate();
    const commentRef = useRef<HTMLInputElement>(null);
    let {slug} = useParams();
    const context = useUserContext();
    useEffect(() => {
        axiosGet(`/api/blog/${slug}/`, context)
          .then((res) => {
            const {blog} = res;
            const {likes, comments} = res;
            assert(
              typeof blog === "object" &&
                typeof likes === "number" &&
                Array.isArray(comments)
            );
            const blogDetails: BlogDetailProps = {
              ...blog,
              likes,
              comments,
            };
            setBlogDetail(blogDetails);
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
    console.log(blogDetail);
    return (
      blogDetail && (
        <div className="container relative mx-auto mt-3 bg-slate-100 rounded-lg px-4 py-4">
          <div>
            <h1 className="font-serif text-3xl">{blogDetail.title}</h1>
            <div className="flex justify-between">
              <span>{blogDetail.username}</span>
              <h5 className="italic">Created at:</h5>
            </div>
            <h3>{blogDetail.level}</h3>
            <h2>{blogDetail.description}</h2>
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
            <button className="hover:scale-125 transition ease-in-out active:rotate-12">
              <MdThumbUpAlt size={40} className="text-cyan-400" />
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
          <div
            className={`absolute px-4 w-full right-0 rounded-lg pt-2 ${styles["blog-comment"]}`}
          >
            <h3 className="italic">Comments</h3>
            <div className="flex gap-3 w-full rounded-lg border-2 px-4 py-1 bg-zinc-400 ">
              <h4>Author: </h4>
              <p>Comment</p>
            </div>
          </div>
        </div>
      )
    );
}
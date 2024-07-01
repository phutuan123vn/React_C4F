import styles from "./style.module.scss";

export default function BlogCreate() {

    return (
      <div className="container mx-auto w-full ">
        <h1 className="text-4xl text-center">Create Blog</h1>
        <form className={`${styles['form-group']} flex flex-col items-center text-black text-lg w-2/3 m-auto border-2`}>
          <div className="mt-4 flex gap-2 items-center w-4/5">
            <label className="w-28 text-white" htmlFor="title">
              Title:
            </label>
            <input
              className="rounded-lg py-1 px-2 w-2/3 border-2"
              type="text"
              name="title"
            />
          </div>
          <div className="mt-4 flex gap-2 items-center w-4/5">
            <label className="w-28 text-white" htmlFor="description">
              Description:
            </label>
            <input
              className="rounded-lg py-1 px-2 w-2/3 border-2"
              type="text"
              name="description"
            />
          </div>
          <div className="mt-4 flex gap-2 items-center w-4/5">
            <label className="w-28 text-white" htmlFor="level">
              Level:
            </label>
            <input
              className="rounded-lg py-1 px-2 w-2/3 border-2"
              type="text"
              name="level"
            />
          </div>
          <div className="mt-4 flex gap-2 items-center w-4/5">
            <label className="w-28 text-white" htmlFor="content">
              Content:
            </label>
            <textarea className="rounded-lg py-1 px-2 w-2/3 border-2 max-h-72 overflow-y-auto min-h-60" name="content" />
          </div>
          <button className="w-2/5 bg-gray-700 mt-6 rounded-full text-2xl p-2 hover:shadow-md text-white hover:bg-slate-500 hover:text-stone-600">
            Submit
          </button>
        </form>
      </div>
    );
}
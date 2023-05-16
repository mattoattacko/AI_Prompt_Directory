import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="flex-start flex-col w-full max-w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {type} Post
        </span>
      </h1>

      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world. Let your imagination run wild with any AI-powered platform.
      </p>

      <form 
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-2xl mt-10 gap-7 glassmorphism"
      >
        {/* Prompt */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>

          <textarea 
            value={post.prompt}
            //get the event and set the post. First spread the entire post value and then set the prompt to be e.target.value because it updates the prompt of the post. 
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="What's your AI prompt?"
            className="form_textarea"
          />
        </label>

        {/* Tags */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {` `}
            <span className="font-normal">
              (#product, #webdev, #art, etc)
            </span>
          </span>

          <textarea 
            value={post.tag}
            //get the event and set the post. First spread the entire post value and then set the prompt to be e.target.value because it updates the prompt of the post. 
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            className="form_input"
            required
          />
        </label>

        {/* Buttons */}
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link
            href="/"
            className="text-gray-500 text-sm"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting} // disable the submit button if the form is submitting
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {/* check if we are submitting. If we are show which button type is active */}
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form
import Feed from "@components/Feed";
const Home = () => {
  return (
    <section className="flex flex-center flex-col w-full"> 
      <h1 className="head_text text-center">
        Discover & Share      
        <br className="max-md:hidden"/>
        <span className="orange_gradient text-center">
          AI-Powered Prompts
        </span>
      </h1>

      <p className="desc text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ullamcorper tincidunt quam, ac congue turpis. Sed nibh nibh, congue vitae urna et, blandit aliquam orci. Curabitur et gravida ipsum. 
      </p>

      {/* Feed Component */}
      <Feed />
    </section>
  )
}

export default Home
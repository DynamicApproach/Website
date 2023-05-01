export const testpg = () => {
  return (
    <div
      className="light:bg-white 
    min-h-screen bg-backgray bg-gradient-to-r from-backgray
   to-albanypurp bg-cover bg-scroll"
    >
      <section
        id="about-section"
        className="bg-green-50 py-40"
        data-scroll-section
      >
        <div className="container mx-auto px-5">
          <div id="about" className="grid-cols-2 items-start gap-4 lg:grid">
            <h2
              className="text-5xl font-extrabold"
              data-scroll
              data-scroll-sticky
              data-scroll-target="#about"
            >
              About
            </h2>
            <div className="pt-4 text-xl lg:pt-0">...</div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default testpg;

const Footer = () => {
  return (
    <section className="py-5 px-20 bg-gray-900 text-gray-400 flex justify-between items-center">
      <div className="text-2xl font-bold">#TIDE</div>
      <div>
        <p className="uppercase">new to tide?</p>
        <p className="mb-2">
          Subscribe to our newsletter to get updates on our latest offers!
        </p>
        <form className="w-full flex gap-2">
          <div className="w-2/3">
            <input
              type="text"
              className="w-full p-2 rounded"
              placeholder="Enter email address"
            />
          </div>
          <div>
            <button
              type="submit"
              className="uppercase p-2 border-2 border-gray-600 rounded"
            >
              send
            </button>
          </div>
        </form>
      </div>
      <div>
        <p className="uppercase">tide international</p>
        <div>
          <p>Algeria</p>
          <p>Egypt</p>
          <p>Ghana</p>
          <p>Kenya</p>
          <p>Uganda</p>
        </div>
      </div>
    </section>
  );
};

export default Footer;

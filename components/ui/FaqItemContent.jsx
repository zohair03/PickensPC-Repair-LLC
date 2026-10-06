const FaqItemContent = ({ faq, isOpen }) => (
  <div className="flex flex-col">
    <p className="font-extralight font-serif max-[380px]:text-sm max-[380px]:leading-8 text-lg leading-10 md:text-xl md:leading-12 text-gray-800">
      {faq.question}
    </p>
    <div
      className={`overflow-hidden transition-all duration-500 ease-in-out ${
        isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <p className="mt-3 font-sans max-[380px]:text-sm text-base md:text-lg text-gray-800 max-[380px]:leading-5 leading-relaxed pr-8">
        {faq.answer}
      </p>
    </div>
  </div>
);

export default FaqItemContent;
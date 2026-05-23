"use client";

const faqItems = [

  {
    question:
      "Is the platform responsible for cargo damages?",

    answer:
      "No. The platform only connects drivers and companies. All transport responsibility belongs to the involved parties."
  },

  {
    question:
      "How do I apply for a load?",

    answer:
      "Drivers can browse the marketplace and click TAKE LOAD to submit an application."
  },

  {
    question:
      "Can companies remove posted loads?",

    answer:
      "Yes. Companies can delete loads at any time before assigning a driver."
  },

  {
    question:
      "What happens after a driver is accepted?",

    answer:
      "The load becomes assigned and both parties can communicate directly through the platform chat."
  },

  {
    question:
      "Are payments handled by the platform?",

    answer:
      "No. Transport payments and agreements are handled directly between companies and drivers unless stated otherwise."
  },

  {
    question:
      "Can free users access the marketplace?",

    answer:
      "Yes, but free plans may have limitations regarding visible loads or posted loads."
  }

];

export default function FAQPage() {

  return (

    <div className="
      min-h-screen
      bg-black
      text-white
      px-6
      py-16
    ">

      <div className="
        max-w-5xl
        mx-auto
      ">

        {/* HEADER */}

        <div className="mb-16">

          <p className="
            text-yellow-400
            uppercase
            tracking-[6px]
            font-bold
            mb-4
          ">

            Support

          </p>

          <h1 className="
            text-7xl
            font-black
            mb-6
          ">

            Frequently Asked Questions

          </h1>

          <p className="
            text-gray-400
            text-xl
            max-w-3xl
          ">

            Important information regarding
            platform usage, transport operations
            and subscriptions.

          </p>

        </div>

        {/* FAQ */}

        <div className="
          space-y-6
        ">

          {faqItems.map((item, index) => (

            <div
              key={index}
              className="
                bg-white/5
                border
                border-white/10
                rounded-3xl
                p-8
              "
            >

              <h2 className="
                text-2xl
                font-black
                mb-4
              ">

                {item.question}

              </h2>

              <p className="
                text-gray-300
                text-lg
                leading-relaxed
              ">

                {item.answer}

              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}
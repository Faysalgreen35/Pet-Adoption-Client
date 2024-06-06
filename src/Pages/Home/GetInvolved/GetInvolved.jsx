 
const GetInvolved = () => {
  const involvementOptions = [
    {
      id: 1,
      title: 'Volunteer',
      description: 'Join our team of dedicated volunteers to help take care of the animals and support our events.',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQw-TqQSRE0m-YEE9l4gCNEPldxRruo-lK9Q&s',
    },
    {
      id: 2,
      title: 'Donate',
      description: 'Support our mission by making a donation. Every contribution helps us provide better care for the animals.',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/004/327/955/original/donation-box-throwing-hearts-in-a-box-for-donations-donate-giving-money-and-love-concept-of-charity-give-and-share-your-love-with-people-humanitarian-volunteer-activity-vector.jpg',
    },
    {
      id: 3,
      title: 'Foster',
      description: 'Provide a temporary home for animals in need. Your love and care can make a huge difference.',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTobjxoNv3y8Yb-oysKGOrDzMK8dhv_y3RcMoPBsqHtgJ31y_NQHggyuSGAd2U6NTtbCzI&usqp=CAU',
    },
  ];

  return (
    <div className="bg-gray-100 py-12  dark:bg-gray-800  dark:text-white ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Get Involved</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  dark:bg-gray-800  dark:text-white ">
          {involvementOptions.map((option) => (
            <div key={option.id} className="bg-white rounded-lg shadow-lg overflow-hidden  dark:bg-gray-800  dark:text-white ">
              <img src={option.imageUrl} alt={option.title} className="w-full h-48 object-cover"/>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                <p>{option.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetInvolved;

// src/components/HappyTails.js
 

const HappyTails = () => {
  const stories = [
    {
      id: 1,
      petName: 'Buddy',
      imageUrl: 'https://static.givealittle.co.nz/assets/gallery/2f52c281-fb94-450b-a873-a4be00e34188-1280',
      story: 'Buddy was found on the streets and now has a loving home with the Smith family.'
    },
    {
      id: 2,
      petName: 'Mittens',
      imageUrl: 'https://i.etsystatic.com/20605227/r/il/2087f5/2285025066/il_570xN.2285025066_4og5.jpg',
      story: 'Mittens was rescued from a shelter and is now enjoying life with her new owner, Jane.'
    },
    {
        id: 3,
        petName: 'Max',
        imageUrl: 'https://ewscripps.brightspotcdn.com/dims4/default/d0a725c/2147483647/strip/true/crop/1920x1008+0+36/resize/1200x630!/quality/90/?url=https%3A%2F%2Fx-default-stgec.uplynk.com%2Fausw%2Fslices%2F4e9%2Fef205c0e5ea14d77944cbd6904335118%2F4e984a33e8ad434caab8b8105140a6da%2Fposter_27de66b44fbd4ce387965674d260c0e4.jpeg',
        story: 'Max was abandoned but now has a happy home with the Johnson family.',
      },
  ];

  return (
    <div className="bg-gray-100 py-12  dark:bg-gray-800  dark:text-white ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Happy Tails</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div key={story.id} className="bg-white rounded-lg shadow-lg overflow-hidden  dark:bg-gray-800  dark:text-white ">
              <img src={story.imageUrl} alt={story.petName} className="w-full h-48 object-cover"/>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{story.petName}</h3>
                <p>{story.story}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HappyTails;

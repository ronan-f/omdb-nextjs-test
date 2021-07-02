const mockReviews = [

    {
        id: 1,
        username: "user123",
        profilePicture: "user123.png",
        rating: 4,
        review: "Brooklyn pop-up brunch synth, tumeric umami pour-over chia williamsburg. Chambray meh ramps bespoke drinking vinegar, ugh tumblr locavore pitchfork yuccie selvage +1 schlitz blog banjo.",
        postedAt: "7 hours ago",
        movie: {
            title: "Star Wars",
            poster: "http://www.limitedruns.com/media/cache/94/29/9429b9ea25ec28a7f204d8e40b1cac35.jpg",
            link: "starwars.com"
        }
    },
    {
        id: 2,
        username: "user123",
        profilePicture: "user123.png",
        rating: 2,
        review: "Freegan beard locavore stumptown umami try-hard fashion axe schlitz chambray pork belly farm-to-table gluten-free. Brunch letterpress freegan waistcoat fanny pack.",
        postedAt: "5 hours ago",
        movie: {
            title: "Fletch",
            poster: "https://d2e111jq13me73.cloudfront.net/sites/default/files/styles/product_image_aspect_switcher_170w/public/product-images/csm-movie/fletch.jpg?itok=Dxui1S7R",
            link: "starwars.com"
        }
    },
    {
        id: 3,
        username: "user123",
        profilePicture: "user123.png",
        postedAt: "2 hours ago",
        rating: 5,
        review: "Next level leggings bicycle rights portland marfa raw denim green juice brunch. Pitchfork art party church-key swag subway tile. Blog man bun seitan cliche kombucha tote bag shoreditch photo booth food truck mlkshk hell of poutine vaporware post-ironic craft beer.",
        movie: {
            title: "Black Fish",
            poster: "https://m.media-amazon.com/images/M/MV5BNTkyNTkwMzkxMl5BMl5BanBnXkFtZTcwMzAwOTE2OQ@@._V1_.jpg",
            link: "starwars.com"
        }
    }

]

const useGetReviews = () => {
    // TODO: get actual reviews

    return mockReviews;
}

export default useGetReviews
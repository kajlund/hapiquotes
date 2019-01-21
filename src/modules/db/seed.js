module.exports = [
  {
    model: "User",
    documents: [
      {
        email: "kaj.lund@gmail.com",
        password: process.env.AUTH_ADMIN_PWD
      }
    ]
  },
  {
    model: "Quote",
    documents: [
      {
        author: "Bill Bryson",
        content:
          "And then it occurred to me that a computer is a stupid machine with the ability to do incredibly smart things, while computer programmers are smart people with the ability to do incredibly stupid things. They are, in short, a perfect match.",
        votes: Math.floor(Math.random() * 100) + 1,
        categories: ["IT"],
        language: "en",
        user: null
      },
      {
        author: "Brian Kernighan",
        content:
          "Everyone knows that debugging is twice as hard as writing a program in the first place. So if you are as clever as you can be when you write it, how will you ever debug it?",
        votes: Math.floor(Math.random() * 100) + 1,
        categories: ["IT"],
        language: "en",
        user: null
      },
      {
        author: "Jeremy S. Anderson",
        content:
          "There are two major products that come out of Berkeley: LSD and UNIX. We don’t believe this to be a coincidence.",
        votes: Math.floor(Math.random() * 100) + 1,
        categories: ["IT"],
        language: "en",
        user: null
      },
      {
        author: "Thomas Watson, chairman of IBM, 1943",
        content: "I think there is a world market for maybe five computers.",
        votes: Math.floor(Math.random() * 100) + 1,
        categories: ["IT"],
        language: "en",
        user: null
      },
      {
        author: "Edsger W. Dijkstra",
        content: "The question of whether computers can think is like the question of whether submarines can swim.",
        votes: Math.floor(Math.random() * 100) + 1,
        categories: ["IT"],
        language: "en",
        user: null
      },
      {
        author: "Popular Mechanics, forecasting the relentless march of science, 1949",
        content: "Computers in the future may weigh no more than 1.5 tons.",
        votes: Math.floor(Math.random() * 100) + 1,
        categories: ["IT"],
        language: "en",
        user: null
      },
      {
        author: "Steve McConnell",
        content: "Good code is its own best documentation.",
        votes: Math.floor(Math.random() * 100) + 1,
        categories: ["IT"],
        lang: "en"
      }
    ]
  }
]

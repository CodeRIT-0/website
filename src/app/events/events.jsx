const { defaults } = require("lodash")

const eventData = [
    {
        "Name": "CP WORKSHOP",
        "Year": "2019-20",
        "Date": "8th Feb",
        "ActualDate": "2020-02-08",
        "Priority": 3,
        "Description": "The workshop involved concepts about algorithms and data structures required to solve competitive programming questions efficiently. The workshop involved concepts about algorithms and data structures required to solve competitive programming questions efficiently.",
        "img": "/Events/cp.jpg"
    },
    {
        "EventName": "DSA Workshop",
        "Name": "DSA Workshop",
        "Year": "2019-20",
        "Date": "7th Feb",
        "ActualDate": "2020-02-07",
        "Priority": 3,
        "Description": "The workshop was conducted for students to get introduced to some basic as well as some advanced topics in data structures and algorithms.",
        "img": "/Events/dsa.jpg"
    },
    {
        "EventName": "Tech Talk",
        "Name": "Tech Talk",
        "Year": "2020",
        "Date": "28th November",
        "ActualDate": "2020-11-28",
        "Priority": 3,
        "Description": "Tech talk session emphasized technical interview complexities, resume building, and interview experiences for 70 participating students.",
        "img": "/Events/techtalk.jpg"
    },
    {
        "EventName": "Flask Workshop",
        "Name": "Flask Workshop",
        "Year": "2020",
        "Date": "31st October",
        "ActualDate": "2020-10-31",
        "Priority": 3,
        "Description": "Flask Workshop introduced students to Flutter, covering Dart, Flutter SDK, database interaction, benefiting 101 participants.",
        "img": "/Events/flutter.jpg"
    },
    {
        "EventName": "GSOC Workshop",
        "Name": "GSOC Workshop",
        "Year": "2020",
        "Date": "24th October",
        "ActualDate": "2020-10-24",
        "Priority": 3,
        "Description": "GSoC Workshop introduced students to open source participation and explained the selection criteria and preparation required for GSoC.",
        "img": "/Events/gsoc.jpg"
    },
    {
        "EventName": "Whackiest",
        "Name": "WHackiest",
        "Year": "2021",
        "Date": "2nd April",
        "ActualDate": "2021-04-02",
        "Priority": 1,
        "Description": "Virtual semester Hackathon themed 'Hacking the post Lockdown World' engaged students in a 36-hour coding challenge with surprise bonus tasks and mentorship sessions, culminating in cash prizes and awards.",
        "img": "/Events/whackiest.jpg"
    },
    {
        "EventName": "Women in Tech",
        "Name": "Women in Tech",
        "Year": "2021",
        "Date": "23rd May",
        "ActualDate": "2021-05-23",
        "Priority": 3,
        "Description": "Online session empowers female students with insights on tech industry opportunities, resume building, current trends, and effective LinkedIn strategies.",
        "img": "/Events/women in tech.jpg"
    },
    {
        "EventName": "Git and Github Workshop",
        "Name": "Git and Github Workshop",
        "Year": "2021",
        "Date": "18th May",
        "ActualDate": "2021-05-18",
        "Priority": 3,
        "Description": "Workshop on Git/Github imparts crucial source code management skills, covering repository setup, forking, branching, merging, and Github readme templates.",
        "img": "/Events/git github.jpg"
    },
    {
        "EventName": "Binary Search",
        "Name": "Binary Search",
        "Year": "2021",
        "Date": "29th November",
        "ActualDate": "2021-11-29",
        "Priority": 2,
        "Description": "Binary Search meet enhances students' understanding of the algorithm's efficiency and applications through interactive problem-solving sessions.",
        "img": "/Events/binary search.jpg"
    },
    {
        "EventName": "Resume Building Workshop",
        "Name": "Resume Building Workshop",
        "Year": "2021",
        "Date": "14th December",
        "ActualDate": "2021-12-14",
        "Priority": 3,
        "Description": "Online session equips students with resume-building skills, including ATS-friendly formatting, LinkedIn profile optimization, and professional networking strategies.",
        "img": "/Events/resume building.jpg"
    },
    {
        "EventName": "Bull's Eye",
        "Name": "Bull's Eye",
        "Year": "2022",
        "Date": "22nd and 23rd June",
        "ActualDate": "2022-06-22",
        "Priority": 2,
        "Description": "Flutter Workshop organized by CodeRIT and Google DSC guides 344 students in building a dynamic UI and clone app, fostering hands-on Flutter development skills.",
        "img": "/Events/bulls eye.jpg"
    },
    {
        "EventName": "Pyplot",
        "Name": "PyPlot",
        "Year": "2022",
        "Date": "27th and 28th June",
        "ActualDate": "2022-06-27",
        "Priority": 3,
        "Description": "Python Workshop by CodeRIT and Google DSC introduces 247 students to Python basics, sorting algorithms, and GUI application development.",
        "img": "/Events/pyplot.jpg"
    },
    {
        "EventName": "Git and Github Workshop",
        "Name": "Git and Github Workshop",
        "Year": "2022",
        "Date": "14th October",
        "ActualDate": "2022-10-14",
        "Priority": 3,
        "Description": "Workshop on Git/Github imparts crucial source code management skills, covering repository setup, forking, branching, merging, and Github readme templates.",
        "img": "/Events/github workshop.jpg"
    },
    {
        "EventName": "Orientation",
        "Name": "Orientation",
        "Year": "2022",
        "Date": "14th December",
        "ActualDate": "2022-12-14",
        "Priority": 3,
        "Description": "The semester's inaugural meet engages over 300 students across all years and departments, focusing on diverse activities including workshops, competitive programming, hackathons, and skill development sessions.",
        "img": "/Events/orientation.jpg"
    },
    {
        "EventName": "WHackiest",
        "Name": "WHackiest",
        "Year": "2023",
        "Date": "27th and 28th Jan",
        "ActualDate": "2023-01-27",
        "Priority": 1,
        "Description": "Virtual semester Hackathon themed 'Hacking the post Lockdown World' engaged students in a 36-hour coding challenge with surprise bonus tasks and mentorship sessions, culminating in cash prizes and awards.",
        "img": "/Events/whackiest2.jpg"
    },
    {
        "EventName": "Host the Hype",
        "Name": "Host the Hype",
        "Year": "2023",
        "Date": "20th October",
        "ActualDate": "2023-10-20",
        "Priority": 3,
        "Description": "Part of Recruitment Drive where Group Discussion was conducted and students where grouped with other branch students.",
        "img": "/Events/host the hype.jpg"
    },
    {
        "EventName": "Talk to Seniors",
        "Name": "Talk to Seniors",
        "Year": "2024",
        "Date": "22nd March",
        "ActualDate": "2024-03-22",
        "Priority": 3,
        "Description": "Interactive session connecting students with seniors. The event facilitated meaningful conversations about career guidance, placement insights, and academic experiences with CodeRIT's senior members.",
        "img": "/Events/2024-03-22-talktoseniors.jpeg"
    },
    {
        "EventName": "Icebreaker",
        "Name": "Icebreaker",
        "Year": "2024",
        "Date": "22nd November",
        "ActualDate": "2024-11-22",
        "Priority": 3,
        "Description": "Energetic welcome event for the newest batch with full house attendance! The session successfully introduced freshers to CodeRIT's vibrant culture and community, setting the stage for an exciting coding journey ahead.",
        "img": "/Events/2024-11-22-icebreaker.jpg"
    },
    {
        "EventName": "wHACKiest",
        "Name": "wHACKiest",
        "Year": "2024",
        "Date": "21st-22nd December",
        "ActualDate": "2024-12-21",
        "Priority": 1,
        "Description": "CodeRIT's flagship annual hackathon featuring an exciting two-phase format with Ideathon and 24-hour coding challenge. Teams showcased incredible innovation, enhanced by mentoring sessions and thrilling surprise tasks.",
        "img": "/Events/2024-12-23-whackiest.webp"
    },
    {
        "EventName": "22 Yards of Code",
        "Name": "22 Yards of Code",
        "Year": "2025",
        "Date": "23rd May",
        "ActualDate": "2025-05-23",
        "Priority": 2,
        "Description": "Unique cricket and coding crossover contest - The high-energy event brilliantly combined strategic thinking with programming challenges, creating an unforgettable experience of sportsmanship and technical skills.",
        "img": "/Events/2024-05-23-22yardsofcode.webp"
    }
]
export default eventData;
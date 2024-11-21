const { defaults } = require("lodash")

const eventData = [
    {
        "Name": "CP WORKSHOP",
        "Year": "2019-20",
        "Date": "8th Feb",
        "Description": "The workshop involved concepts about algorithms and data structures required to solve competitive programming questions efficiently. The workshop involved concepts about algorithms and data structures required to solve competitive programming questions efficiently.",
        "img": "/Events/cp.jpg"
    },
    {
        "EventName": "DSA Workshop",
        "Name": "DSA Workshop",
        "Year": "2019-20",
        "Date": "7th Feb",
        "Description": "The workshop was conducted for students to get introduced to some basic as well as some advanced topics in data structures and algorithms.",
        "img": "/Events/dsa.jpg"
    },
    {
        "EventName": "Tech Talk",
        "Name": "Tech Talk",
        "Year": "2020",
        "Date": "28th November",
        "Description": "Tech talk session emphasized technical interview complexities, resume building, and interview experiences for 70 participating students.",
        "img": "/Events/techtalk.jpg"
    },
    {
        "EventName": "Flask Workshop",
        "Name": "Flask Workshop",
        "Year": "2020",
        "Date": "31st October",
        "Description": "Flask Workshop introduced students to Flutter, covering Dart, Flutter SDK, database interaction, benefiting 101 participants.",
        "img": "/Events/flutter.jpg"
    },
    {
        "EventName": "GSOC Workshop",
        "Name": "GSOC Workshop",
        "Year": "2020",
        "Date": "24th October",
        "Description": "GSoC Workshop introduced students to open source participation and explained the selection criteria and preparation required for GSoC.",
        "img": "/Events/gsoc.jpg"
    },
    {
        "EventName": "Whackiest",
        "Name": "WHackiest",
        "Year": "2021",
        "Date": "2nd April",
        "Description": "Virtual semester Hackathon themed 'Hacking the post Lockdown World' engaged students in a 36-hour coding challenge with surprise bonus tasks and mentorship sessions, culminating in cash prizes and awards.",
        "img": "/Events/whackiest.jpg"
    },
    {
        "EventName": "Women in Tech",
        "Name": "Women in Tech",
        "Year": "2021",
        "Date": "23rd May",
        "Description": "Online session empowers female students with insights on tech industry opportunities, resume building, current trends, and effective LinkedIn strategies.",
        "img": "/Events/women in tech.jpg"
    },
    {
        "EventName": "Git and Github Workshop",
        "Name": "Git and Github Workshop",
        "Year": "2021",
        "Date": "18th May",
        "Description": "Workshop on Git/Github imparts crucial source code management skills, covering repository setup, forking, branching, merging, and Github readme templates.",
        "img": "/Events/git github.jpg"
    },
    {
        "EventName": "Binary Search",
        "Name": "Binary Search",
        "Year": "2021",
        "Date": "29th November",
        "Description": "Binary Search meet enhances students' understanding of the algorithm's efficiency and applications through interactive problem-solving sessions.",
        "img": "/Events/binary search.jpg"
    },
    {
        "EventName": "Resume Building Workshop",
        "Name": "Resume Building Workshop",
        "Year": "2021",
        "Date": "14th December",
        "Description": "Online session equips students with resume-building skills, including ATS-friendly formatting, LinkedIn profile optimization, and professional networking strategies.",
        "img": "/Events/resume building.jpg"
    },
    {
        "EventName": "Bull’s Eye",
        "Name": "Bull’s Eye",
        "Year": "2022",
        "Date": "22nd and 23rd June",
        "Description": "Flutter Workshop organized by CodeRIT and Google DSC guides 344 students in building a dynamic UI and clone app, fostering hands-on Flutter development skills.",
        "img": "/Events/bulls eye.jpg"
    },
    {
        "EventName": "Pyplot",
        "Name": "PyPlot",
        "Year": "2022",
        "Date": "27th and 28th June",
        "Description": "Python Workshop by CodeRIT and Google DSC introduces 247 students to Python basics, sorting algorithms, and GUI application development.",
        "img": "/Events/pyplot.jpg"
    },
    {
        "EventName": "Git and Github Workshop",
        "Name": "Git and Github Workshop",
        "Year": "2022",
        "Date": "14th October",
        "Description": "Workshop on Git/Github imparts crucial source code management skills, covering repository setup, forking, branching, merging, and Github readme templates.",
        "img": "/Events/github workshop.jpg"
    },
    {
        "EventName": "Orientation",
        "Name": "Orientation",
        "Year": "2022",
        "Date": "14th December",
        "Description": "The semester's inaugural meet engages over 300 students across all years and departments, focusing on diverse activities including workshops, competitive programming, hackathons, and skill development sessions.",
        "img": "/Events/orientation.jpg"
    },
    {
        "EventName": "WHackiest",
        "Name": "WHackiest",
        "Year": "2023",
        "Date": "27th and 28th Jan",
        "Description": "Virtual semester Hackathon themed 'Hacking the post Lockdown World' engaged students in a 36-hour coding challenge with surprise bonus tasks and mentorship sessions, culminating in cash prizes and awards.",
        "img": "/Events/whackiest2.jpg"
    },
    {
        "EventName": "Host the Hype",
        "Name": "Host the Hype",
        "Year": "2023",
        "Date": "20th October",
        "Description": "Part of Recruitment Drive where Group Discussion was conducted and students where grouped with other branch students.",
        "img": "/Events/host the hype.jpg"
    }
]
export default eventData;
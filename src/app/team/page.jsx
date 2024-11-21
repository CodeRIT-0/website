import FacultyCard from "@/src/Card/FacultyCard"
import AlumniSection from "@/src/components/AlumniSection"
import Card from "@/src/Card/Card"
import Faculty from "./Faculty"
import Alumni from "./Alumni"
import Seniors from "./Seniors"
import Juniors from './Juniors'

export default function Team() {
    return (
        <div className="mt-[72px] bg-gray-300">
            <div className="mx-4 p-4">
                <h1 className="text-4xl font-bold text-center mb-8 mt-6 text-white">
                    <span className="bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg shadow-xl">The Faculty</span>
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 justify-center">
                    {
                        Faculty.map((ele, index) => {
                            return (
                                <FacultyCard person={ele} key={index} />
                            )
                        })
                    }
                </div>
            </div>

            <div className="p-4 mt-12">

                <div className="w-full">
                    <AlumniSection alumni={Alumni} />
                </div>
            </div>

            <div className="mt-12 mb-4 p-4">
                <h1 className="text-4xl font-bold text-center mb-8 mt-6 text-white">
                    <span className="bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg shadow-xl">Senior Core</span>
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
                    {
                        Seniors.map((ele, index) => {
                            return (
                                <Card person={ele} key={index} />
                            )
                        })
                    }
                </div>
            </div>


            <div className="mt-12 mb-4 p-4">
                <h1 className="text-4xl font-bold text-center mb-8 mt-6 text-white">
                    <span className="bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg shadow-xl">Junior Core</span>
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
                    {
                        Juniors.map((ele, index) => {
                            return (
                                <Card person={ele} key={index} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
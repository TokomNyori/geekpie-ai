import React from "react";
import Bounded from "../minor/Bounded";
import BentoGrid from "../minor/BentoGrid";
import { featuresDB } from "../../../dbs";

const Features = () => {
    return (
        <Bounded className="text-center">
            <h1 className="text-balance text-center text-5xl font-medium md:text-7xl">
                The new <br />
                <em className="bg-gradient-to-b from-yellow-100 to-yellow-600 bg-clip-text not-italic text-transparent">
                    Gold Standard
                </em>
                .
            </h1>
            <p className="mx-auto mt-6 max-w-md text-balance text-slate-300">
                Introducing a new way of building components and layouts that leaves
                everything else in the dust.
            </p>

            <div className="mt-16 max-w-4xl grid grid-rows-[auto_auto_auto] gap-8 md:grid-cols-3 md:gap-10">
                <BentoGrid data={featuresDB} />
            </div>
        </Bounded>
    );
};

export default Features;

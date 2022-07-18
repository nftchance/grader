import { Route, Routes } from "react-router-dom";

import loadable from "@loadable/component";

import Loading from "../Loading/Loading";

const LoadableTool = loadable(() => import("../Tool/Tool"), { fallback: <Loading /> })
const LoadableFAQ = loadable(() => import("../FAQ/FAQ"), { fallback: <Loading /> })
const LoadableOpenGraph = loadable(() => import("../OpenGraph/OpenGraph"), { fallback: <Loading /> })
const LoadableEgg = loadable(() => import("../Egg/Egg"), { fallback: <Loading /> })
const LoadableRanker = loadable(() => import("../Ranker/Ranker"), { fallback: <Loading /> })

const Router = () => {
    return (
        <Routes>
            <Route exact path="/" element={<LoadableTool />} />
            <Route path="faq/" element={<LoadableFAQ />} />
            <Route path="ranker/" element={<LoadableRanker />} />
            <Route path="opengraph/" element={<LoadableOpenGraph />} />
            <Route path="egg/" element={<LoadableEgg />} />
        </Routes>
    )
}

export default Router;
import AskAi from "./nodes/ai/ask-ai"
import DateTime from "./nodes/core/date-time"
import InputFlow from "./nodes/core/input-flow"
import OutputFlow from "./nodes/core/output-flow"
import Interface from "./nodes/interface"
import Pdf from "./nodes/pdf/pdf-reader"
import Crawler from "./nodes/scraper/crawler"
import WebScraper from "./nodes/scraper/web-scraper"

export default ({ slug, ...props }) => {

    switch (slug) {
        case "date_time":
            return <DateTime {...props} />
        case "read_pdf":
            return <Pdf {...props} />
        case "web_scraping":
            return <WebScraper {...props} />
        case "web_scraping_crawler":
            return <Crawler {...props} />
        case "ask_ai":
            return <AskAi {...props} />
        case "input":
            return <InputFlow  {...props} />
        case "interface":
            return <Interface  {...props} />
        case "output":
            return <OutputFlow  {...props} />
        default:
            return <></>
    }

}
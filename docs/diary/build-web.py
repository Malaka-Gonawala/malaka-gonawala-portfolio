# Builds diary-page.html (a web page version of diary.md) for publishing as an Artifact.
import subprocess, pathlib, re
here = pathlib.Path(__file__).parent
md = (here / "diary.md").read_text()
md = re.sub(r"^---\n.*?\n---\n", "", md, flags=re.S)
body = subprocess.run(["pandoc", "-f", "markdown", "-t", "html", "--toc", "--toc-depth=2", "-s",
    "--template", str(here / "web-template.html")], input=md, capture_output=True, text=True, check=True).stdout
body = body.replace("<table>", '<div class="table-wrap"><table>').replace("</table>", "</table></div>")
(here / "diary-page.html").write_text(body)
print("Built diary-page.html")

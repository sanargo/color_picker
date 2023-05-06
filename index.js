document.addEventListener("click", (e) => {
    if (e.target.id === "create-scheme") {
        getSchemeObj()
    }
    if (e.target.dataset.code) {
        copyContent(e.target.dataset.code)
    }
})

const getSchemeObj = async () => {
    const colorPicker = document.getElementById("color-picker").value.slice(1);
    const schemeOptions = document.getElementById("scheme-options").value;

    const res = await fetch(`https://www.thecolorapi.com/scheme?hex=${colorPicker}&mode=${schemeOptions}&count=5`)
    const data  = await res.json()

    let codes = []
    for (let i = 0; i < data.colors.length; i++) {
        document.getElementById(`color${i}`).style.backgroundColor = data.colors[i].hex.value
        codes.push(`<p data-code="${data.colors[i].hex.value}">${data.colors[i].hex.value}</p>`)
    }
    
    document.getElementById("color-code").innerHTML = codes.join('')

    }

const copyContent = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}

getSchemeObj();
    

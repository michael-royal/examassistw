const pdfdiv = document.querySelector('#pdfdivs'),
      getlinks = fetch('/pdfs.json').then(res => res.json()).then((data) => {
        console.log(data)


        data.forEach(pdf => {
            const pdfs = document.createElement('div')
            pdfs.classList = 'card border-0 mt-3 p-1 ro'

            pdfs.innerHTML = `
                <h3 class="p-1 fs-4">${pdf.name}</h3>
                <a class= "p-1" href="${pdf.link}">Preview</a>
                <a download="" class= "p-1" href="${pdf.link}">Download</a>

            `

            pdfdiv.appendChild(pdfs)
        });
      })

      
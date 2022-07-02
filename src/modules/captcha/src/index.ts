import '@exlg/core/types/module-entry'

utils.mustMatch([/^\/discuss\/.*/, /^\/image/])

let img: JQuery<HTMLImageElement> = $('img[data-v-3e1b4641],#verify_img')
const autofill = async () => {
    const canvas = document.createElement('canvas')
    canvas.width = img[0].width
    canvas.height = img[0].height
    canvas.getContext('2d')?.drawImage(img[0], 0, 0)
    const input = $("input[placeholder$='验证码']")[0] as HTMLInputElement
    input.value = await utils.csPost(
        'https://luogu-captcha-bypass.piterator.com/predict/',
        canvas.toDataURL('image/jpeg')
    ).responseText
    input.dispatchEvent(new Event('input'))
}
if (img.length) {
    // Note: 登陆和讨论
    img.click()
    img[0].onload = autofill
} else {
    // Note: 图床
    $(document).on('focus', "input[placeholder$='验证码']", () => {
        img = $('#--swal-image-hosting-upload-captcha')
        img[0].onload = autofill
    })
}

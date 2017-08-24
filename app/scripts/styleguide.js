(function ($) {
   
    function parseColor(color) {
        var arr = []; color.replace(/[\d+\.]+/g, function (v) { arr.push(parseFloat(v)); });
        return {
            hex: "#" + arr.slice(0, 3).map(toHex).join(""),
            opacity: arr.length == 4 ? arr[3] : 1
        };
    }
    function toHex(int) {
        var hex = int.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }   
   
    $('#styleguide').find('[data-for]').each(function (idx,element) {
        const el = $(`#${element.dataset.for}`);
        const val = el.css(element.dataset.value);
        let result;
        if (element.dataset.value.indexOf('color') !== -1) {
            const parsed = parseColor(val);
            result = `<strong>Color: Hex:</strong> ${parsed.hex} <strong>Opacity:</strong> ${parsed.opacity} <strong>RGB: </strong>${val}`
            
        }
        if (element.dataset.value.indexOf('font-size') !== -1) {
            result = `<strong>Font size:</strong> ${val}`;
        }
        if (element.dataset.value.indexOf('font-weight') !== -1) {
            result = `<strong>Font weight:</strong> ${val}`;
        }
        if (element.dataset.value.indexOf('font-family') !== -1) {
            result = `<strong>Font:</strong> ${val}`;
        }

        $(element).html(result);
    });
})($);

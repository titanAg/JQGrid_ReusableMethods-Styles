// Anonymous function to initialize jqGrid defaults any additional configuration 
$(function() {
    jQuery.extend(jQuery.jgrid.defaults,{
                  viewrecords: true,
                  recordtext: "Records {0} - {1} of {2}",
                  emptyrecords: "No records to display",
                  loadtext: "Loading...",
                  pgtext : "Page {0} of {1}",
                  rowNum: 5,
                  rowList: [5, 10, 20, 50, 100, 1000],
                  altRows: true,
                  altclass: "myAltRowClass",
                  height: "auto"
    });
});

function reloadGridSize(grid) {
    grid.setGridWidth($("#gbox_" + grid[0].id).parent().innerWidth());
}

function initGrid(grid, caption, data, colNames, colModel, ondblClickRow) {
    "use strict";
    grid.jqGrid({
        colNames: colNames,
        colModel: colModel,
        data: data, // JSON or XML
        showSortIcon: true,
        iconSet: "fontAwesome",
        rownumbers: true,
        sortname: "name",
        sortorder: "asc",
        toppager: true,
        pager: true,
        caption: caption, // table heading
        ondblClickRow: ondblClickRow 
    });
    reloadGridSize(grid);
};

function ZoomFmpFormatter(cellvalue, options, rowObject)
{
    let companyHeadingLeft = document.createElement("div");
    companyHeadingLeft.classList.add("source-table-heading");
    let sourceBadge = document.createElement("p");
    sourceBadge.classList.add("source-badge");
    if(!cellvalue) {
        sourceBadge.classList.add("zoominfo");
        sourceBadge.innerHTML = "zoominfo";
    }else{
        sourceBadge.classList.add("fmp");
        sourceBadge.innerHTML = "fmp";
    }
    companyHeadingLeft.appendChild(sourceBadge);
    return companyHeadingLeft.outerHTML;
}

function ScoreFormatter(cellvalue, options, rowObject) {
    return cellvalue ? Number(cellvalue).toFixed(2) + "%" : "N/A";
}

function textFormatter(cellvalue, options, rowObject)
{
    return cellvalue ? cellvalue : "N/A";
}

function currencyFormatter(cellvalue, options, rowObject) {       
    return cellvalue ? "$" + Number(cellvalue).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "N/A";
}


function getDetailsLink(cellValue, options, rowdata, action) 
{
    let companyDetailsURL = document.createElement("a");
    companyDetailsURL.classList.add("details-link");
    companyDetailsURL.innerHTML = '<i class="fa fa-newspaper-o" aria-hidden="true"></i> More Details..';
    if (rowdata.ticker) {
        companyDetailsURL.href = 'details.html?company_name=' + rowdata.name + '&ticker=' + rowdata.ticker;
    }
    else {
        companyDetailsURL.style.color = "#A6ACAF";
    }

    return companyDetailsURL.outerHTML;
} 


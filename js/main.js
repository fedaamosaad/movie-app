let rowData = document.getElementById('rowData')

$(document).ready(() => {
    nowPlaying().then(() => {
        $(".loading").fadeOut(900)
        $("body").css("overflow", "visible")

    })
})
// -------------------------------------------------sideNav-------------------------------------------------



function openMenu() {
    $(".nav-cont").animate({ left: '0px' }, 500);
    $("i.open-menu").removeClass("fa-align-justify");
    $("i.open-menu").addClass("fa-x fs-5");

    for (let i = 0; i < 6; i++) {
        $(".menu li").eq(i).animate({
            top: 0
        }, (i + 6) * 100)
    }
}

function closeMenu() {
    let navWidth = $(".nav-cont .side-list").outerWidth()
    $(".nav-cont").animate({ left: -navWidth }, 500);
    $("i.open-menu").addClass("fa-align-justify");
    $("i.open-menu").removeClass("fa-x fs-5");
    $(".menu li").animate({ top: 300 }, 500)
}
closeMenu()

$('.nav-cont i.open-menu').click(() => {

    if ($('.nav-cont').css('left') == '0px') {
        closeMenu()
    }
    else {
        openMenu()
    }
})
// -----------------------------------animation-------------------------------------------------


$(document).ready(function(){
    $('.movie-img').hover(
        function() {
            $(this).find('.overlay').css({"opacity":"1","visibility":"visible"});
            $(this).find('.name').removeClass('animate__slideOutLeft').addClass('animate__fadeInDown animate__delay-0s');
            $(this).find('.desc').removeClass('animate__slideOutLeft').addClass('animate__flipInX animate__delay-0s');
            $(this).find('.date').removeClass('animate__slideOutLeft').addClass('animate__fadeInUp animate__delay-0s');
            $(this).find('.rate').removeClass('animate__slideOutLeft').addClass('animate__fadeInUp animate__delay-0s');
        },
        function() {
            $(this).find('.overlay').css({"opacity":"0","visibility":"hidden"});
            $(this).find('.name').removeClass('animate__fadeInDown animate__delay-0s').addClass('animate__slideOutLeft');
            $(this).find('.desc').removeClass('animate__flipInX animate__delay-0s').addClass('animate__slideOutLeft');
            $(this).find('.date').removeClass('animate__fadeInUp animate__delay-0s').addClass('animate__slideOutLeft');
            $(this).find('.rate').removeClass('animate__fadeInUp animate__delay-0s').addClass('animate__slideOutLeft');
        }
    );
});

// -----------------------------------------------------------------fetchMovies---------------------

async function fetchMovies(endpoint) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${endpoint}?api_key=535c7871f58574de62364da02407d42b`);
    const data = await response.json();
    // console.log(data.results);
    displayMovies(data.results);
}

function displayMovies(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `<div class="col-lg-4 col-md-6 col-sm-12 ">
            <div class="movie position-relative overflow-hidden rounded-2">
                    <div class="movie-img"> 
                        <img src="${arr[i]?.poster_path ? 'https://image.tmdb.org/t/p/original' + arr[i].poster_path : (arr[i]?.backdrop_path ? 'https://image.tmdb.org/t/p/original' + arr[i].backdrop_path :  'images/images.png')}
                        " class="w-100 img-fluid" alt="movie">
                    </div>
                    <div
                        class="overlay animate__animated overflow-hidden start-0 end-0 top-0 bottom-0 position-absolute d-flex flex-column p-4">
                        <h2 class="animate__animated text-center fs-3 name">${arr[i].title || arr[i].name}</h2>
                        <p class="animate__animated  desc">${arr[i].overview.slice(0, 250)}</p>
                        <p class="animate__animated date"><span >Release Date<span> : ${arr[i].release_date}</p>                        
                        <h3 class="animate__animated rate"><i class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning"></i></h3>
                        <div class="circle-vote d-inline-block"><h3 class="animate__animated d-inline-block p-2 rounded-circle border-success vote">${arr[i].vote_average.toFixed(1)}</h3></div>
                    </div>
                </div>
            </div>`
    }

    rowData.innerHTML = cartoona
}

async function nowPlaying() {
    fetchMovies('now_playing');
}
nowPlaying()
async function getPopular() {
    fetchMovies('popular');
}

async function getTopRated() {
    fetchMovies('top_rated');
}

async function getUpComing() {
    fetchMovies('upcoming');
}





async function search(name) {
    closeMenu()
    rowData.innerHTML = ""
    let searched = await fetch(`https://api.themoviedb.org/3/search/movie?query=${name}&api_key=535c7871f58574de62364da02407d42b&language=en-US&include_adult=false`)

    let data = await searched.json()
    data.results ? displayMovies(data.results) : displayMovies([])
    // console.log(data.results);
}
search('')
value= 'https://image.tmdb.org/t/p/original'
function checkMovieImage(value, imgPath) {
    if (value.poster_path == null && value.backdrop_path == null) {
        movieImage = `images/images.png`;
    }
    else if (value.poster_path == null) {
        movieImage = `${imgPath + value.backdrop_path}`;
    }
    else if (value.hasOwnProperty('poster_path')) {
        movieImage = `${imgPath + value.poster_path}`;
    }
}




// -------------------validation-------------------

function validations() {
    $('#contact input').on("input", function () {
        $('#contact input').on("input", function () {
            if (checkClassError()) 
            {
                $('form button').addClass('animate__shakeX bg-danger buttonFormActive');
                $(`form button`).mouseenter(formButtonValidation);
                $('form button').addClass('animate__shakeX bg-danger buttonFormActive');
                $('form button').css({ 'cursor': 'default', 'userSelect': 'none' });
            }
            else {
                $('form button').removeClass('animate__shakeX bg-danger buttonFormActive');
                $(`form button`).css({ "marginLeft": "0px" });
                $('form button').off('mouseenter', formButtonValidation);
                $('form button').removeClass('animate__shakeX bg-danger buttonFormActive');
                $('form button').css('cursor', 'pointer');
            }
        })
        function checkClassError() {
            if ($('#contact .error').hasClass('animate__flipInX')) {
                return true;
            }
            else {
                return false;
            }
        }
    })
    $('#contact #name').on("input", function () {
        const regex = /^[a-zA-z\s]{1,36}$/
        const $error = $('#name').next();
        const $this = $(this);
        if ($(this).val() == "") {
            hideError($error, $this);
        }
        else if (regex.test($(this).val())) {
            hideError($error, $this);
        }
        else {
            $error.html("Invalid Name , only Characters allowed");
            ShowError($error, $this);
        }
    })
    $('#contact #email').on("input", function () {
        const regex = /^[a-zA-Z0-9.+-_~!#$%'/=`{|}]+@[a-z0-9]+\.[a-z]{3}$/;
        const $error = $('#email').next();
        const $this = $(this);
        if ($(this).val() == "") {
            hideError($error, $this);
        }
        else if (regex.test($(this).val())) {
            hideError($error, $this);
        }
        else {
            $error.html("Invalid Email , try example@domain.com");
            ShowError($error, $this);
        }
    })
    $('#contact #phone').on("input", function () {
        const regex = /^(02)?(01)[0125][0-9]{8}$/;
        const $error = $('#phone').next();
        const $this = $(this);
        if ($(this).val() == "") {
            hideError($error, $this);
        }
        else if (regex.test($(this).val())) {
            hideError($error, $this);
        }
        else {
            $error.html("Invalid Phone Number");
            ShowError($error, $this);
        }
    })
    $('#contact #age').on("input", function () {
        const regex = /^(1[6-9]|[2-9][0-9]|100)$/;
        const $error = $('#age').next();
        const $this = $(this);
        if ($(this).val() == "") {
            hideError($error, $this);
        }
        else if (regex.test($(this).val())) {
            hideError($error, $this);
        }
        else {
            $error.html("Your age must be over 16+");
            ShowError($error, $this);
        }
    })
    $('#contact #password').on("input", function () {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const $error = $('#password').next();
        const $this = $(this);
        if ($(this).val() == "") {
            hideError($error, $this);
        }
        else if (regex.test($(this).val())) {
            hideError($error, $this);
        }
        else {
            $error.html("password must contain numbers & letters at least 8 character");
            ShowError($error, $this);
        }
    })
    $('#contact #repassword').on("input", function () {
        const $error = $('#repassword').next();
        const $this = $(this);
        if ($(this).val() == "") {
            hideError($error, $this);
        }
        else if ($(this).val() == $('#password').val()) {
            hideError($error, $this);
        }
        else {
            $error.html("Password not match");
            ShowError($error, $this);
        }
    })
    $('.showPass').click(function () {
        if ($('#password').attr('type') == "text") {
            $('#password').attr('type', 'password');
            $('.showPass').html('<i data-show="show" class="fa-solid fa-eye-slash"></i>');
        } else {
            $('#password').attr('type', 'text');
            $('.showPass').html('<i data-show="show" class="fa-solid fa-eye"></i>');
        }
    })
    $('#password').focus(function () {
        $('.showPass').css("opacity", 1);
        $('.showPass').css("bottom", 10);
    })
    $(document).click(function (e) {
        if ($(e.target)[0] == $('#password')[0] || $(e.target).attr('data-show') == $('.showPass i').attr('data-show')) {
            $('.showPass').css("opacity", 1);
            $('.showPass').css("bottom", 10);
        }
        else {
            $('.showPass').css("opacity", 0);
            $('.showPass').css("bottom", -20);
        }
    })
    function hideError($error, $this) {
        $this.css("border-bottom-color", "#CED4DA");
        $error.html(null);
        $error.removeClass('animate__animated animate__flipInX');
        $error.addClass('animate__animated animate__fadeOutUp');
    }
    function ShowError($error, $this) {
        $this.css("border-bottom-color", "rgb(214, 46, 51)");
        $error.removeClass('animate__animated animate__fadeOutUp');
        $error.addClass('animate__animated animate__flipInX');
    }
    function formButtonValidation() {
        let buttonLocation = $(`form button`).css("marginLeft")
        if (buttonLocation == "250px") {
            $(`form button`).css({ "marginLeft": "0px" });
        }
        else {
            $(`form button`).css({ "marginLeft": "250px" });
        }
        $(`form button`).keydown(function (e) {
            if (e.key == "Enter") {
                event.preventDefault();
            }
        })
    }
}

// ---------------------------------------arrow-----------------------------------------
$(function () {

    function showBackToTop() {
        $('#arrow').addClass('show-arrow');
    }
    function hideBackToTop() {
        $('#arrow').removeClass('show-arrow');
    }
    function checkScrollPos() {
        if ($(this).scrollTop() >= 700) {
            showBackToTop();
        } else {
            hideBackToTop()
        }
    }
    $('#arrow').click(function () { $(window).scrollTop(0) });
    $(window).on('scroll', function () {
        checkScrollPos();
    });
    checkScrollPos();
})
window.onload = function () {

    $('[data-toggle="tooltip"]').tooltip();

    $.ajax({
        dataType: "json",
        url: "http://127.0.0.1:8080/api/v1/todos",
        mimeType: "application/json",
        success: function (result) {
            var content = "";
            var id = null;

            $.each(result, function (index, value) {
                content = value.content;
                id = value.id;
                done = value.done;

                var css = `
                <div id=${id} class="row px-3 align-items-center todo-item rounded" > \
                <div class="col-auto m-1 p-0 d-flex align-items-center"> \
                    <h2 class="m-0 p-0"> \
                        <i id="progress${id}" onClick="updateComplete(${id})" class="fa fa-square-o text-primary btn m-0 p-0" data-toggle="tooltip" \
                            data-placement="bottom" title="Mark as complete"></i> \
                         <i id="complete${id}" onClick="updateProgress(${id})" class="fa fa-check-square-o text-primary btn m-0 p-0" data-toggle="tooltip" \
                             data-placement="bottom" title="Mark as todo"></i> \
                    </h2> \
                </div> \
                <div class="col px-1 m-1 d-flex align-items-center"> \
                    <input id="r_input${id}" type="text" \
                        class="form-control form-control-lg border-0 edit-todo-input bg-transparent rounded px-3" \
                        readonly value="" /> \
                    <input id="e_input${id}" type="text" \
                        class="form-control form-control-lg border-0 edit-todo-input rounded px-3 d-none" \
                        value="" /> \
                </div> \
                <div class="col-auto m-1 p-0 px-3 d-none"> \
                </div> \
                <div class="col-auto m-1 p-0 todo-actions"> \
                    <div class="row d-flex align-items-center justify-content-end"> \
                        <h5 class="m-0 p-0 px-2"> \
                            <i onClick="updateTodo(${id});" class="fa fa-pencil text-info btn m-0 p-0" data-toggle="tooltip" \
                                data-placement="bottom" title="Edit todo"></i> \
                        </h5> \
                        <h5 class="m-0 p-0 px-2"> \
                            <button onClick="deleteTodo(${id});" class="fa fa-trash-o text-danger btn m-0 p-0" data-toggle="tooltip" \
                                data-placement="bottom" title="Delete todo"></i> \
                        </h5> \
                    </div> \
                </div> \
            </div >`;

                $("#Todos").append(css);
                $(`#${id}`).find('input').val(content);
                if (done) {
                    $(`#progress${id}`).addClass("d-none");
                } else {
                    $(`#complete${id}`).addClass("d-none");
                }
            });
        },
        error: function (status, error) {
            alert("status:" + status + ", error:" + error);
        }
    });

    $('#createTodo').click(function () {
        var data = $('#input_Todo').val();
        $.ajax({
            dataType: "json",
            type: 'POST',
            url: "http://127.0.0.1:8080/api/v1/todos",
            contentType: 'application/json',
            data: JSON.stringify({
                content: data,
            }),
            success: function () {
                location.reload();
            },
            error: function (status, error) {
                alert("status:" + status + ", error:" + error);
            }
        })
    });
};

function deleteTodo(id) {
    $.ajax({
        url: "http://127.0.0.1:8080/api/v1/todos/" + id,
        type: 'DELETE',
        dataType: "json",
        success: function (data) {
            location.reload();
        }
    })
};

function updateTodo(id) {
    $(`#r_input${id}`).addClass("d-none");
    $(`#e_input${id}`).removeClass("d-none");

    $(document).ready(function () {
        $(`#e_input${id}`).keydown(function (key) {
            if (key.keyCode == 13) {
                var data = $(`#e_input${id}`).val();
                var done = $(`#progress${id}`).hasClass("d-none");

                $.ajax({
                    url: "http://127.0.0.1:8080/api/v1/todos/" + id,
                    type: 'PUT',
                    dataType: "json",
                    contentType: 'application/json',
                    data: JSON.stringify({
                        content: data,
                        done: done
                    }),
                    success: function () {
                        location.reload();

                        $(`#r_input${id}`).removeClass("d-none");
                        $(`#e_input${id}`).addClass("d-none");
                    },
                    error: function (status, error) {
                        alert("status:" + status + ", error:" + error);
                    }
                });
            }
        });
    });
};

function updateComplete(id) {
    var data = $(`#r_input${id}`).val();

    $.ajax({
        url: "http://127.0.0.1:8080/api/v1/todos/" + id,
        type: 'PUT',
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify({
            content: data,
            done: true
        }),
        success: function () {
            location.reload();
        },
        error: function (status, error) {
            alert("status:" + status + ", error:" + error);
        }
    });
}

function updateProgress(id) {
    var data = $(`#r_input${id}`).val();

    $.ajax({
        url: "http://127.0.0.1:8080/api/v1/todos/" + id,
        type: 'PUT',
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify({
            content: data,
            done: false
        }),
        success: function () {
            location.reload();
        },
        error: function (status, error) {
            alert("status:" + status + ", error:" + error);
        }
    });

}


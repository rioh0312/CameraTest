'use strict';
class OrbitControls {

    constructor(camera, target, container) {
        this._camera = camera;
        this._target = target;
        this._container = container;
        this._prevX = 0;
        this._prevY = 0;
        this._isMouseDown = false;
        this.orbitX = 0;
        this.orbitY = 0;
        this.scale = 10;
        this.maxRotationY = 90 * Math.PI / 180;
        this.minRotationY = 0;
        this._init();
    }

    _init() {
        var container = this._container;
        container.addEventListener('mouseup', this._mouseup.bind(this), false);
        container.addEventListener('mousedown', this._mousedown.bind(this), false);
        container.addEventListener('mousewheel', this._mousewheel.bind(this), false);
    }

    _mousedown(e) {
        this._isMouseDown = true;
        this._prevX = e.pageX;
        this._prevY = e.pageY;

        if (!this._bindMousemove) {
            this._bindMousemove = this._mousemove.bind(this);
        }
        this._container.addEventListener('mousemove', this._bindMousemove, false);
    }

    _mouseup(e) {
        this._isMouseDown = false;
        this._container.removeEventListener('mousemove', this._bindMousemove, false);
    }

    _mousewheel(e) {
        this.scale -= e.wheelDelta / 5;
        e.preventDefault();
    }

    _mousemove(e) {
        var deltaX = e.pageX - this._prevX;
        var deltaY = e.pageY - this._prevY;

        this.orbitX -= deltaX / 1000;
        this.orbitY += deltaY / 1000;
        if (this.orbitY > this.maxRotationY) {
            this.orbitY = this.maxRotationY;
        }
        else if (this.orbitY < this.minRotationY) {
            this.orbitY = this.minRotationY;
        }

        this._prevX = e.pageX;
        this._prevY = e.pageY;
    }

    update() {
        // Yが0（sin(0)）のときは1となり、地面からの角度は0
        var x = Math.sin(this.orbitX) * Math.cos(this.orbitY) * this.scale;

        // Yが0でXも0のときに1となる計算。
        var z = Math.cos(this.orbitX) * Math.cos(this.orbitY) * this.scale;

        // Yは単純にYの位置のsinで決まる
        var y = Math.sin(this.orbitY) * this.scale;

        this._camera.position.set(x, y, z);
        this._camera.lookAt(this._target);
    }
}

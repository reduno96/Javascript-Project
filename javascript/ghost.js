class Ghost {
  constructor(
    x,
    y,
    width,
    height,
    speed,
    imageX,
    imageY,
    imageWidth,
    imageHeight,
    range
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.direction = DIRECTION_RIGHT;
    this.imageX = imageX;
    this.imageY = imageY;
    this.imageHeight = imageHeight;
    this.imageWidth = imageWidth;
    this.range = range;
    this.randomTargetsIndex = parseInt(
      Math.random() * randomTargetsForGhost.length
    );
    setInterval(() => {
      this.changeRandomDirection();
    }, 10000);
  }
  changeRandomDirection() {
    this.randomTargetIndex += 1;
    this.randomTargetIndex = this.randomTargetIndex % 4;
  }
  moveProcess() {
    if (this.isInRangeOfPacman()) {
      target = pacman;
    } else {
      this.target = randomTargetsForGhost[this.randomTargetsIndex];
    }
    this.changeDirectionIfPossible();
    this.moveForwards();
    if (this.checkCollisions()) {
      this.moveBackwards();
    }
  }

  moveBackwards() {
    switch (this.direction) {
      case DIRECTION_RIGHT:
        this.x -= this.speed;
        break;
      case DIRECTION_UP:
        this.y += this.speed;
        break;
      case DIRECTION_LEFT:
        this.x += this.speed;
        break;
      case DIRECTION_BOTTOM:
        this.y -= this.speed;
        break;
    }
  }

  moveForwards() {
    switch (this.direction) {
      case DIRECTION_RIGHT:
        this.x += this.speed;
        break;
      case DIRECTION_UP:
        this.y -= this.speed;
        break;
      case DIRECTION_LEFT:
        this.x -= this.speed;
        break;
      case DIRECTION_BOTTOM:
        this.y += this.speed;
        break;
    }
  }

  checkCollisions() {
    let isCollided = false;
    if (
      map[parseInt(this.y / oneBlockSize)][parseInt(this.x / oneBlockSize)] ==
        1 ||
      map[parseInt(this.y / oneBlockSize + 0.9999)][
        parseInt(this.x / oneBlockSize)
      ] == 1 ||
      map[parseInt(this.y / oneBlockSize)][
        parseInt(this.x / oneBlockSize + 0.9999)
      ] == 1 ||
      map[parseInt(this.y / oneBlockSize + 0.9999)][
        parseInt(this.x / oneBlockSize + 0.9999)
      ] == 1
    ) {
      isCollided = true;
    }
    return isCollided;
  }

  isInRangeOfPacman() {
    let xDistance = Math.abs(pacman.getMapX() - this.getMapX);
    let yDistance = Math.abs(pacman.getMapY() - this.getMapY);
    if (
      Math.sqrt(xDistance * xDistance + yDistance * yDistance) <= this.range
    ) {
      return true;
    }
    return false;
  }
  changeDirectionIfPossible() {
    let tempDirection = this.direction;
    this.direction = this.calculateNewDirection(
      map,
      parseIntthis(this.target.x / oneBlockSize),
      parseIntthis(this.target.y / oneBlockSize)
    );
    this.moveForwards();
    if (this.checkCollisions()) {
      this.moveBackwards();
      this.direction = tempDirection;
    } else {
      this.moveBackwards;
    }
  }

  calculateNewDirection(map, destX, desY) {
    let mp = [];
    for (let i = 0; map.length; i++) {
      mp[i] = mp[i].slice();
    }
  }
  changeAnimation() {
    this.currentFrame =
      this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1;
  }

  draw() {
    canvasContext.save();

    canvasContext.drawImage(
      ghostFrames,
      this.imageX,
      this.imageY,
      this.imageHeight,
      this.imageWidth,
      this.x,
      this.y,
      this.width,
      this.height
    );
    canvasContext.restore();
  }

  getMapX() {
    return parseInt(this.x / oneBlockSize);
  }
  getMapY() {
    return parseInt(this.y / oneBlockSize);
  }
  getMapXRightSide() {
    return parseInt((this.x + 0.9999 * oneBlockSize) / oneBlockSize);
  }
  getMapYRightSide() {
    return parseInt((this.Y + 0.9999 * oneBlockSize) / oneBlockSize);
  }
}

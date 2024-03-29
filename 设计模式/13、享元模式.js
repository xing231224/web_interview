// 运用共享技术有效地支持大量细粒度对象的复用。
// 系统只使用少量的对象，而这些对象都很相似，状态变化很小，可以实现对象的多次复用
// 由于享元模式要求能够共享的对象必须细粒度对象,因此它又称为轻量级模式,它是一种对象结构型模式


let examCarNum = 0 // 驾考车总数
// 驾考车对象
class ExamCar {
    constructor(carType) {
        examCarNum++
        this.carId = examCarNum
        this.carType = carType ? '手动挡' : '自动挡'
        this.usingState = false // 是否正在使用
    }

    // 在本车上考试
    examine(candidateId) {
        return new Promise((resolve, reject) => {
            this.usingState = true
            console.log(`考生-${candidateId} 开始在${this.carType}驾考车- ${this.carId}上考试`);
            setTimeout(() => {
                this.usingState = false
                console.log(`%c考生- ${candidateId} 在${this.carType}驾考车- ${this.carId} 上考试完毕`, 'color:#f40')
                resolve()
            }, Math.random() * 2000)
        })
    }
}

// 手动挡汽车对象池
ManualExamCarPool = {
    _pool: [],    //驾考车对象池
    _candidateQueue: [],  // 考生队列

    // 注册考生 ID 列表
    registCandidates(candidateList) {
        candidateList.forEach(candidate => this.registCandidate(candidate))
    },
    // 注册手动挡考生 
    registCandidate(candidateId) {
        const examCar = this.getManualExamCar() // 找一个未被占用的手动挡驾考车
        if (examCar) {
            examCar.examine(candidateId) // 开始考试，考完了让队列中的下一个考生开始考试
                .then(() => {
                    const nextCandidateId = this._candidateQueue.length && this._candidateQueue.shift()
                    nextCandidateId && this.registCandidate(nextCandidateId)
                })
        }
    },
    // 注册手动挡车
    initManualExamCar(manualExamCarNum) {
        for (let i = 1; i <= manualExamCarNum; i++) {
            this._pool.push(new ExamCar(true))
        }
    },
    // 获取状态为未被占用的手动挡车
    getManualExamCar() {
        return this._pool.find(car => !car.usingState)
    }
}

ManualExamCarPool.initManualExamCar(3) // 一共有3个驾考车
ManualExamCarPool.registCandidates([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) // 10个考生来考试

// 场景例子
// 文件上传需要创建多个文件实例的时候
// 如果一个应用程序使用了大量的对象，而这些大量的对象造成了很大的存储开销时就应该考虑使用享元模式
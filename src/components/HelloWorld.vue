<template>
  <div class="container">
    <button
      type="button"
      class="btn btn-primary my-2 me-2"
      @click="fetchStatus"
    >
      重新整理
    </button>
    <span v-if="error">{{ error }}</span>
    <!-- <pre>{{ all_erp_status }}</pre> -->
    <nav>
      <ul class="nav nav-tabs erp_status">
        <li class="nav-item" v-for="(erp_status, key) in all_erp_status">
          <a
            class="nav-link active erp-name"
            aria-current="page"
            @click="update(erp_status)"
          >
            {{ erpName[key] }}
            <small
              class="badge rounded-pill bg-danger"
              v-if="erp_status.isSync === false"
            >
              待更新
            </small>
            <small
              class="badge rounded-pill bg-success"
              v-if="erp_status.isSync === null"
            >
              連線中
            </small>
          </a>
        </li>
      </ul>
    </nav>
    <!-- <pre>current_erp: {{ current_erp }}</pre> -->
    <div class="content" v-if="current_erp">
      <a
        class="btn btn-primary my-3"
        target="_blank"
        :href="current_erp.network"
        >Github Network</a
      >
      <div class="row">
        <div class="col">
          <div>
            <h1>
              <span class="col-6">測試機</span>
            </h1>
            <p>
              <span class="col-7">
                最後更新:
                <a :href="current_erp.lastest_stage.link">{{
                  current_erp.lastest_stage.log
                }}</a>
              </span>
            </p>
            <div v-html="current_erp.lastest_stage.html"></div>
          </div>
        </div>
        <div class="col">
          <div>
            <h1>
              <span class="col-6">正式機</span>
            </h1>
            <p>
              <span class="col-7">
                最後更新:
                <a :href="current_erp.lastest_prod.link">{{
                  current_erp.lastest_prod.log
                }}</a>
              </span>
            </p>
            <div v-html="current_erp.lastest_prod.html"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "./../utility/jenkinsAPI";
export default {
  name: "Hello World",
  created() {
    this.fetchStatus();
  },
  data() {
    return {
      all_erp_status: {
        ccerpF: {
          isSync: null,
        },
        ccerpFV: {
          isSync: null,
        },
        ccerpB: {
          isSync: null,
        },
        ccgeoF: {
          isSync: null,
        },
        ccgeoB: {
          isSync: null,
        },
        jserpF: {
          isSync: null,
        },
        jserpB: {
          isSync: null,
        },
        patronF: {
          isSync: null,
        },
        patronB: {
          isSync: null,
        },
        prettyF: {
          isSync: null,
        },
        prettyB: {
          isSync: null,
        },
        campF: {
          isSync: null,
        },
        campB: {
          isSync: null,
        },
      },
      current_erp: null,
      error: null,
    };
  },
  methods: {
    async fetchStatus() {
      try {
        // this.all_erp_status = null;
        // this.current_erp = null;
        this.error = "連線中...";
        const [
          ccerpF,
          ccerpFV,
          ccerpB,
          ccgeoF,
          ccgeoB,
          jserpF,
          jserpB,
          patronF,
          patronB,
          prettyF,
          prettyB,
          campF,
          campB,
        ] = await Promise.all([
          API.fetchUpdateStatus({ job: "ccerp", repo: "ccerp-frontend" }),
          API.fetchUpdateStatus({ job: "ccerp", repo: "ccerp-frontend-vue" }),
          API.fetchUpdateStatus({ job: "ccerp", repo: "ccerp-backend" }),
          API.fetchUpdateStatus({ job: "ccgeo", repo: "ccgeo-frontend" }),
          API.fetchUpdateStatus({ job: "ccgeo", repo: "ccgeo-backend" }),
          API.fetchUpdateStatus({ job: "jserp", repo: "frontend" }),
          API.fetchUpdateStatus({ job: "jserp", repo: "backend" }),
          API.fetchUpdateStatus({ job: "patron", repo: "frontend" }),
          API.fetchUpdateStatus({ job: "patron", repo: "backend" }),
          API.fetchUpdateStatus({ job: "pretty", repo: "frontend" }),
          API.fetchUpdateStatus({ job: "pretty", repo: "backend" }),
          API.fetchUpdateStatus({ job: "easy-camp", repo: "frontend" }),
          API.fetchUpdateStatus({ job: "easy-camp", repo: "backend" }),
        ]);

        // console.log("ccerpF", ccerpF);

        this.all_erp_status = {
          ccerpF,
          ccerpFV,
          ccerpB,
          ccgeoF,
          ccgeoB,
          jserpF,
          jserpB,
          patronF,
          patronB,
          prettyF,
          prettyB,
          campF,
          campB,
        };
        this.error = null;
        // update(ccerpF);
      } catch (e) {
        this.error = e;
      }
    },
    update(erp) {
      this.current_erp = erp;
    },
  },
  computed: {
    erpName() {
      return {
        ccerpF: "全強 ERP 前端 (AngularJS)",
        ccerpFV: "全強 ERP 前端 (Vue)",
        ccerpB: "全強 ERP 後端",
        ccgeoF: "大地監控 前端",
        ccgeoB: "大地監控 後端",
        jserpF: "郡信 ERP 前端",
        jserpB: "郡信 ERP 後端",
        patronF: "台灣守護 ERP 前端",
        patronB: "台灣守護 ERP 後端",
        prettyF: "台灣真美 ERP 前端",
        prettyB: "台灣真美 ERP 後端",
        campF: "露營樂 ERP 前端",
        campB: "露營樂 ERP 後端",
      };
    },
    erpStatus() {
      return this.all_erp_status;
    },
  },
};
</script>

<style scoped>
.status {
  background-color: yellow;
}
</style>
